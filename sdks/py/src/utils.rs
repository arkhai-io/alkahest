use crate::types::PyDefaultExtensionConfig;
use alkahest_rs::{
    types::WalletProvider,
    utils::{
        deploy_alkahest as deploy_alkahest_rs, get_wallet_provider, setup_test_environment,
        DeployAlkahestOptions, EasAddresses, EasSetup, MockAddresses, TestContext,
    },
};
use alloy::{hex, primitives::Address, signers::local::PrivateKeySigner};
use pyo3::{pyclass, pymethods, PyResult};
use std::str::FromStr;

#[pyo3::pyfunction]
#[pyo3(signature = (private_key, rpc_url, deploy_eas=true, eas=None, schema_registry=None))]
pub fn deploy_alkahest<'py>(
    py: pyo3::Python<'py>,
    private_key: String,
    rpc_url: String,
    deploy_eas: bool,
    eas: Option<String>,
    schema_registry: Option<String>,
) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
    use pyo3_async_runtimes::tokio::future_into_py;

    let signer = PrivateKeySigner::from_str(&private_key)
        .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
    let eas_addresses = parse_eas_addresses(eas, schema_registry)?;

    future_into_py(py, async move {
        let provider = get_wallet_provider(signer, rpc_url)
            .await
            .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;
        let config = deploy_alkahest_rs(
            &provider,
            DeployAlkahestOptions {
                eas: eas_setup(deploy_eas, eas_addresses)?,
            },
        )
        .await
        .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;
        Ok(PyDefaultExtensionConfig::from(&config))
    })
}

fn parse_eas_addresses(
    eas: Option<String>,
    schema_registry: Option<String>,
) -> PyResult<Option<EasAddresses>> {
    match (eas, schema_registry) {
        (Some(eas), Some(schema_registry)) => Ok(Some(EasAddresses {
            eas: Address::from_str(&eas)
                .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?,
            schema_registry: Address::from_str(&schema_registry)
                .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?,
        })),
        (None, None) => Ok(None),
        _ => Err(pyo3::exceptions::PyValueError::new_err(
            "eas and schema_registry must be provided together",
        )),
    }
}

fn eas_setup(deploy_eas: bool, eas: Option<EasAddresses>) -> PyResult<EasSetup> {
    match (deploy_eas, eas) {
        (true, None) => Ok(EasSetup::Deploy),
        (false, Some(eas)) => Ok(EasSetup::Existing(eas)),
        (true, Some(_)) => Err(pyo3::exceptions::PyValueError::new_err(
            "existing EAS addresses cannot be provided when deploy_eas is true",
        )),
        (false, None) => Err(pyo3::exceptions::PyValueError::new_err(
            "eas and schema_registry are required when deploy_eas is false",
        )),
    }
}

#[pyclass]
#[derive(Clone)]

pub struct PyWalletProvider {
    pub inner: WalletProvider,
}
#[pymethods]
impl PyWalletProvider {
    #[pyo3(signature = (deploy_eas=true, eas=None, schema_registry=None))]
    pub fn deploy_alkahest<'py>(
        &self,
        py: pyo3::Python<'py>,
        deploy_eas: bool,
        eas: Option<String>,
        schema_registry: Option<String>,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        use pyo3_async_runtimes::tokio::future_into_py;

        let provider = self.inner.clone();
        let eas_addresses = parse_eas_addresses(eas, schema_registry)?;

        future_into_py(py, async move {
            let config = deploy_alkahest_rs(
                &provider,
                DeployAlkahestOptions {
                    eas: eas_setup(deploy_eas, eas_addresses)?,
                },
            )
            .await
            .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;
            Ok(PyDefaultExtensionConfig::from(&config))
        })
    }

    pub fn anvil_increase_time<'py>(
        &self,
        py: pyo3::Python<'py>,
        seconds: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        use alloy::providers::ext::AnvilApi;
        use pyo3_async_runtimes::tokio::future_into_py;

        let provider = self.inner.clone();

        future_into_py(py, async move {
            provider
                .anvil_increase_time(seconds)
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;
            Ok(())
        })
    }

    pub fn anvil_mine<'py>(
        &self,
        py: pyo3::Python<'py>,
        blocks: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        use alloy::providers::ext::AnvilApi;
        use pyo3_async_runtimes::tokio::future_into_py;

        let provider = self.inner.clone();

        future_into_py(py, async move {
            provider
                .anvil_mine(Some(blocks), None)
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;
            Ok(())
        })
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyMockAddresses {
    #[pyo3(get)]
    pub erc20_a: String,
    #[pyo3(get)]
    pub erc20_b: String,
    #[pyo3(get)]
    pub erc721_a: String,
    #[pyo3(get)]
    pub erc721_b: String,
    #[pyo3(get)]
    pub erc1155_a: String,
    #[pyo3(get)]
    pub erc1155_b: String,
}

impl From<&MockAddresses> for PyMockAddresses {
    fn from(m: &MockAddresses) -> Self {
        Self {
            erc20_a: format!("{:?}", m.erc20_a),
            erc20_b: format!("{:?}", m.erc20_b),
            erc721_a: format!("{:?}", m.erc721_a),
            erc721_b: format!("{:?}", m.erc721_b),
            erc1155_a: format!("{:?}", m.erc1155_a),
            erc1155_b: format!("{:?}", m.erc1155_b),
        }
    }
}

#[pyclass]
pub struct EnvTestManager {
    inner: TestContext, // Optional: keep TestContext for internal Rust usage
    runtime: tokio::runtime::Runtime,

    #[pyo3(get)]
    pub rpc_url: String,
    #[pyo3(get)]
    pub god: String,
    #[pyo3(get)]
    pub alice: String,
    #[pyo3(get)]
    pub bob: String,
    #[pyo3(get)]
    pub charlie: String,
    #[pyo3(get)]
    pub alice_private_key: String,
    #[pyo3(get)]
    pub bob_private_key: String,
    #[pyo3(get)]
    pub charlie_private_key: String,
    #[pyo3(get)]
    pub addresses: PyDefaultExtensionConfig,
    #[pyo3(get)]
    pub mock_addresses: PyMockAddresses,
    #[pyo3(get)]
    pub god_wallet_provider: PyWalletProvider,
}

#[pymethods]
impl EnvTestManager {
    #[new]
    pub fn new() -> PyResult<Self> {
        let rt = tokio::runtime::Runtime::new()?;
        let ctx = rt
            .block_on(setup_test_environment())
            .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

        // Extract private keys as hex strings (with 0x prefix)
        let alice_private_key = format!("0x{}", hex::encode(ctx.alice.to_bytes()));
        let bob_private_key = format!("0x{}", hex::encode(ctx.bob.to_bytes()));
        let charlie_private_key = format!("0x{}", hex::encode(ctx.charlie.to_bytes()));

        Ok(Self {
            runtime: rt,
            rpc_url: ctx.anvil.ws_endpoint_url().to_string(),
            god: ctx.god.address().to_string(),
            alice: ctx.alice.address().to_string(),
            bob: ctx.bob.address().to_string(),
            charlie: ctx.charlie.address().to_string(),
            alice_private_key,
            bob_private_key,
            charlie_private_key,
            addresses: PyDefaultExtensionConfig::from(&ctx.addresses),
            mock_addresses: PyMockAddresses::from(&ctx.mock_addresses),
            god_wallet_provider: PyWalletProvider {
                inner: ctx.god_provider.clone(),
            },
            inner: ctx,
        })
    }
}
