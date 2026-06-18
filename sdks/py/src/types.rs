use alkahest_rs::{contracts::IEAS::Attested, types::EscrowClaimed};
use alloy::primitives::{FixedBytes, U256};
use pyo3::{exceptions::PyValueError, pyclass, FromPyObject, IntoPyObject, PyErr, PyResult};

macro_rules! client_address_config {
    ($name:ident) => {
        #[derive(FromPyObject)]
        pub struct $name {
            pub eas: String,
            pub barter_utils: String,
            pub escrow_obligation_default: String,
            pub escrow_obligation_unconditional: String,
            pub payment_obligation: String,
        }
    };
}

client_address_config!(Erc20Addresses);
client_address_config!(Erc721Addresses);
client_address_config!(Erc1155Addresses);
client_address_config!(TokenBundleAddresses);
client_address_config!(NativeTokenAddresses);

#[derive(FromPyObject)]
pub struct OracleAddresses {
    pub eas: String,
    pub trusted_oracle_arbiter: String,
}

#[derive(FromPyObject)]
pub struct AttestationAddresses {
    pub eas: String,
    pub eas_schema_registry: String,
    pub barter_utils: String,
    pub escrow_obligation_default: String,
    pub escrow_obligation_unconditional: String,
    pub escrow_obligation_2_default: String,
    pub escrow_obligation_2_unconditional: String,
}

#[derive(FromPyObject)]
pub struct ArbitersAddresses {
    pub eas: String,
    pub trivial_arbiter: String,
    pub trusted_oracle_arbiter: String,
    pub intrinsics_arbiter: String,
    pub erc8004_arbiter: String,
    pub any_arbiter: String,
    pub all_arbiter: String,
    pub attester_arbiter: String,
    pub expiration_time_after_arbiter: String,
    pub expiration_time_before_arbiter: String,
    pub expiration_time_equal_arbiter: String,
    pub recipient_arbiter: String,
    pub ref_uid_arbiter: String,
    pub revocable_arbiter: String,
    pub schema_arbiter: String,
    pub time_after_arbiter: String,
    pub time_before_arbiter: String,
    pub time_equal_arbiter: String,
    pub uid_arbiter: String,
    pub exclusive_revocable_confirmation_arbiter: String,
    pub exclusive_unrevocable_confirmation_arbiter: String,
    pub nonexclusive_revocable_confirmation_arbiter: String,
    pub nonexclusive_unrevocable_confirmation_arbiter: String,
}

#[derive(FromPyObject)]
pub struct StringObligationAddresses {
    pub eas: String,
    pub obligation: String,
}

// Implement TryFrom for StringObligationAddresses
impl TryFrom<StringObligationAddresses>
    for alkahest_rs::clients::string_obligation::StringObligationAddresses
{
    type Error = PyErr;

    fn try_from(value: StringObligationAddresses) -> PyResult<Self> {
        Ok(Self {
            eas: value
                .eas
                .parse()
                .map_err(|_| PyValueError::new_err("invalid address"))?,
            obligation: value
                .obligation
                .parse()
                .map_err(|_| PyValueError::new_err("invalid address"))?,
        })
    }
}

#[derive(FromPyObject)]
pub struct CommitRevealObligationAddresses {
    pub eas: String,
    pub obligation: String,
}

impl TryFrom<CommitRevealObligationAddresses>
    for alkahest_rs::clients::commit_reveal_obligation::CommitRevealObligationAddresses
{
    type Error = PyErr;

    fn try_from(value: CommitRevealObligationAddresses) -> PyResult<Self> {
        Ok(Self {
            eas: value
                .eas
                .parse()
                .map_err(|_| PyValueError::new_err("invalid address"))?,
            obligation: value
                .obligation
                .parse()
                .map_err(|_| PyValueError::new_err("invalid address"))?,
        })
    }
}

#[derive(FromPyObject)]
pub struct DefaultExtensionConfig {
    pub erc20_addresses: Option<Erc20Addresses>,
    pub erc721_addresses: Option<Erc721Addresses>,
    pub erc1155_addresses: Option<Erc1155Addresses>,
    pub native_token_addresses: Option<NativeTokenAddresses>,
    pub token_bundle_addresses: Option<TokenBundleAddresses>,
    pub attestation_addresses: Option<AttestationAddresses>,
    pub arbiters_addresses: Option<ArbitersAddresses>,
    pub string_obligation_addresses: Option<StringObligationAddresses>,
    pub commit_reveal_obligation_addresses: Option<CommitRevealObligationAddresses>,
}

macro_rules! try_from_address_config {
    ( $from:path, $to:path) => {
        impl TryFrom<$from> for $to {
            type Error = PyErr;

            fn try_from(value: $from) -> PyResult<Self> {
                macro_rules! parse_address {
                    ($name:ident) => {
                        value
                            .$name
                            .parse()
                            .map_err(|_| PyValueError::new_err("invalid address"))?
                    };
                }

                Ok(Self {
                    eas: parse_address!(eas),
                    barter_utils: parse_address!(barter_utils),
                    escrow_obligation_default: parse_address!(escrow_obligation_default),
                    escrow_obligation_unconditional: parse_address!(
                        escrow_obligation_unconditional
                    ),
                    payment_obligation: parse_address!(payment_obligation),
                })
            }
        }
    };
}

try_from_address_config!(Erc20Addresses, alkahest_rs::clients::erc20::Erc20Addresses);
try_from_address_config!(
    Erc721Addresses,
    alkahest_rs::clients::erc721::Erc721Addresses
);
try_from_address_config!(
    Erc1155Addresses,
    alkahest_rs::clients::erc1155::Erc1155Addresses
);
try_from_address_config!(
    TokenBundleAddresses,
    alkahest_rs::clients::token_bundle::TokenBundleAddresses
);
try_from_address_config!(
    NativeTokenAddresses,
    alkahest_rs::clients::native_token::NativeTokenAddresses
);

impl TryFrom<AttestationAddresses> for alkahest_rs::clients::attestation::AttestationAddresses {
    type Error = PyErr;

    fn try_from(value: AttestationAddresses) -> PyResult<Self> {
        macro_rules! parse_address {
            ($name:ident) => {
                value
                    .$name
                    .parse()
                    .map_err(|_| PyValueError::new_err("invalid address"))?
            };
        }

        Ok(Self {
            eas: parse_address!(eas),
            eas_schema_registry: parse_address!(eas_schema_registry),
            barter_utils: parse_address!(barter_utils),
            escrow_obligation_default: parse_address!(escrow_obligation_default),
            escrow_obligation_unconditional: parse_address!(escrow_obligation_unconditional),
            escrow_obligation_2_default: parse_address!(escrow_obligation_2_default),
            escrow_obligation_2_unconditional: parse_address!(escrow_obligation_2_unconditional),
        })
    }
}

impl TryFrom<OracleAddresses> for alkahest_rs::clients::oracle::OracleAddresses {
    type Error = PyErr;

    fn try_from(value: OracleAddresses) -> PyResult<Self> {
        macro_rules! parse_address {
            ($name:ident) => {
                value
                    .$name
                    .parse()
                    .map_err(|_| PyValueError::new_err("invalid address"))?
            };
        }

        Ok(Self {
            eas: parse_address!(eas),
            trusted_oracle_arbiter: parse_address!(trusted_oracle_arbiter),
        })
    }
}

impl TryFrom<DefaultExtensionConfig> for alkahest_rs::DefaultExtensionConfig {
    type Error = PyErr;

    fn try_from(value: DefaultExtensionConfig) -> PyResult<Self> {
        Ok(Self {
            erc20_addresses: value
                .erc20_addresses
                .and_then(|x| x.try_into().ok())
                .unwrap_or_default(),
            erc721_addresses: value
                .erc721_addresses
                .and_then(|x| x.try_into().ok())
                .unwrap_or_default(),
            erc1155_addresses: value
                .erc1155_addresses
                .and_then(|x| x.try_into().ok())
                .unwrap_or_default(),
            native_token_addresses: value
                .native_token_addresses
                .and_then(|x| x.try_into().ok())
                .unwrap_or_default(),
            token_bundle_addresses: value
                .token_bundle_addresses
                .and_then(|x| x.try_into().ok())
                .unwrap_or_default(),
            attestation_addresses: value
                .attestation_addresses
                .and_then(|x| x.try_into().ok())
                .unwrap_or_default(),
            arbiters_addresses: value
                .arbiters_addresses
                .and_then(|x| x.try_into().ok())
                .unwrap_or_default(),
            string_obligation_addresses: value
                .string_obligation_addresses
                .and_then(|x| x.try_into().ok())
                .unwrap_or_default(),
            commit_reveal_obligation_addresses: value
                .commit_reveal_obligation_addresses
                .and_then(|x| x.try_into().ok())
                .unwrap_or_default(),
        })
    }
}

// Implement TryFrom for ArbitersAddresses
impl TryFrom<ArbitersAddresses> for alkahest_rs::clients::arbiters::ArbitersAddresses {
    type Error = PyErr;

    fn try_from(value: ArbitersAddresses) -> PyResult<Self> {
        macro_rules! parse_address {
            ($name:ident) => {
                value
                    .$name
                    .parse()
                    .map_err(|_| PyValueError::new_err("invalid address"))?
            };
        }

        Ok(Self {
            eas: parse_address!(eas),
            trivial_arbiter: parse_address!(trivial_arbiter),
            trusted_oracle_arbiter: parse_address!(trusted_oracle_arbiter),
            intrinsics_arbiter: parse_address!(intrinsics_arbiter),
            erc8004_arbiter: parse_address!(erc8004_arbiter),
            any_arbiter: parse_address!(any_arbiter),
            all_arbiter: parse_address!(all_arbiter),
            attester_arbiter: parse_address!(attester_arbiter),
            expiration_time_after_arbiter: parse_address!(expiration_time_after_arbiter),
            expiration_time_before_arbiter: parse_address!(expiration_time_before_arbiter),
            expiration_time_equal_arbiter: parse_address!(expiration_time_equal_arbiter),
            recipient_arbiter: parse_address!(recipient_arbiter),
            ref_uid_arbiter: parse_address!(ref_uid_arbiter),
            revocable_arbiter: parse_address!(revocable_arbiter),
            schema_arbiter: parse_address!(schema_arbiter),
            time_after_arbiter: parse_address!(time_after_arbiter),
            time_before_arbiter: parse_address!(time_before_arbiter),
            time_equal_arbiter: parse_address!(time_equal_arbiter),
            uid_arbiter: parse_address!(uid_arbiter),
            exclusive_revocable_confirmation_arbiter: parse_address!(
                exclusive_revocable_confirmation_arbiter
            ),
            exclusive_unrevocable_confirmation_arbiter: parse_address!(
                exclusive_unrevocable_confirmation_arbiter
            ),
            nonexclusive_revocable_confirmation_arbiter: parse_address!(
                nonexclusive_revocable_confirmation_arbiter
            ),
            nonexclusive_unrevocable_confirmation_arbiter: parse_address!(
                nonexclusive_unrevocable_confirmation_arbiter
            ),
        })
    }
}

#[derive(FromPyObject)]
#[pyo3(from_item_all)]
pub struct ArbiterData {
    pub arbiter: String,
    pub demand: Vec<u8>,
}

impl TryFrom<ArbiterData> for alkahest_rs::types::ArbiterData {
    type Error = eyre::Error;

    fn try_from(value: ArbiterData) -> eyre::Result<Self> {
        Ok(Self {
            arbiter: value.arbiter.parse()?,
            demand: value.demand.into(),
        })
    }
}

#[derive(FromPyObject)]
#[pyo3(from_item_all)]
pub struct Erc20Data {
    pub address: String,
    pub value: u64,
}

impl TryFrom<Erc20Data> for alkahest_rs::types::Erc20Data {
    type Error = eyre::Error;

    fn try_from(value: Erc20Data) -> eyre::Result<Self> {
        Ok(Self {
            address: value.address.parse()?,
            value: U256::from(value.value),
        })
    }
}

use pyo3::prelude::*;
use pyo3::types::PyType;

#[pyclass]
#[derive(Clone)]
pub struct PyErc20Data {
    #[pyo3(get)]
    pub address: String,

    #[pyo3(get)]
    pub value: u64,
}

#[pymethods]
impl PyErc20Data {
    #[new]
    pub fn new(address: String, value: u64) -> Self {
        Self { address, value }
    }
}

impl TryFrom<PyErc20Data> for alkahest_rs::types::Erc20Data {
    type Error = eyre::Error;

    fn try_from(value: PyErc20Data) -> eyre::Result<Self> {
        Ok(Self {
            address: value.address.parse()?,
            value: U256::from(value.value),
        })
    }
}

#[derive(FromPyObject)]
#[pyo3(from_item_all)]
pub struct Erc721Data {
    pub address: String,
    pub id: u128,
}

impl TryFrom<Erc721Data> for alkahest_rs::types::Erc721Data {
    type Error = eyre::Error;

    fn try_from(value: Erc721Data) -> eyre::Result<Self> {
        Ok(Self {
            address: value.address.parse()?,
            id: value.id.try_into()?,
        })
    }
}

#[derive(FromPyObject)]
#[pyo3(from_item_all)]
pub struct Erc1155Data {
    address: String,
    id: u128,
    value: u128,
}

impl TryFrom<Erc1155Data> for alkahest_rs::types::Erc1155Data {
    type Error = eyre::Error;

    fn try_from(value: Erc1155Data) -> eyre::Result<Self> {
        Ok(Self {
            address: value.address.parse()?,
            id: value.id.try_into()?,
            value: value.value.try_into()?,
        })
    }
}

#[derive(FromPyObject)]
#[pyo3(from_item_all)]
pub struct NativeTokenData {
    pub value: u128,
}

impl TryFrom<NativeTokenData> for alkahest_rs::types::NativeTokenData {
    type Error = eyre::Error;

    fn try_from(value: NativeTokenData) -> eyre::Result<Self> {
        Ok(Self {
            value: U256::from(value.value),
        })
    }
}

#[derive(FromPyObject)]
#[pyo3(from_item_all)]
pub struct TokenBundleData {
    native_amount: Option<u128>,
    erc20s: Vec<Erc20Data>,
    erc721s: Vec<Erc721Data>,
    erc1155s: Vec<Erc1155Data>,
}

impl TryFrom<TokenBundleData> for alkahest_rs::types::TokenBundleData {
    type Error = eyre::Error;

    fn try_from(value: TokenBundleData) -> eyre::Result<Self> {
        let erc20s = value
            .erc20s
            .into_iter()
            .map(|x| x.try_into())
            .collect::<eyre::Result<Vec<_>>>()?;
        let erc721s = value
            .erc721s
            .into_iter()
            .map(|x| x.try_into())
            .collect::<eyre::Result<Vec<_>>>()?;
        let erc1155s = value
            .erc1155s
            .into_iter()
            .map(|x| x.try_into())
            .collect::<eyre::Result<Vec<_>>>()?;

        Ok(Self {
            native_amount: U256::from(value.native_amount.unwrap_or(0)),
            erc20s,
            erc721s,
            erc1155s,
        })
    }
}

#[derive(IntoPyObject)]
pub struct EscowClaimedLog {
    pub payment: String,
    pub fulfillment: String,
    pub fulfiller: String,
}

impl From<EscrowClaimed> for EscowClaimedLog {
    fn from(value: EscrowClaimed) -> Self {
        Self {
            payment: value.payment.to_string(),
            fulfillment: value.fulfillment.to_string(),
            fulfiller: value.fulfiller.to_string(),
        }
    }
}

#[derive(IntoPyObject)]
pub struct AttestedLog {
    pub recipient: String,
    pub attester: String,
    pub uid: String,
    pub schema_uid: String,
}

impl From<Attested> for AttestedLog {
    fn from(value: Attested) -> Self {
        Self {
            recipient: value.recipient.to_string(),
            attester: value.attester.to_string(),
            uid: value.uid.to_string(),
            schema_uid: value.schemaUID.to_string(),
        }
    }
}

#[derive(FromPyObject)]
pub struct AttestationRequestData {
    pub recipient: String,
    pub expiration_time: u64,
    pub revocable: bool,
    pub ref_uid: String,
    pub data: Vec<u8>,
    pub value: u128,
}

#[derive(FromPyObject)]
pub struct AttestationRequest {
    pub schema: String,
    pub data: AttestationRequestData,
}

impl TryFrom<AttestationRequestData> for alkahest_rs::contracts::IEAS::AttestationRequestData {
    type Error = eyre::Error;

    fn try_from(value: AttestationRequestData) -> eyre::Result<Self> {
        Ok(Self {
            recipient: value.recipient.parse()?,
            expirationTime: value.expiration_time,
            revocable: value.revocable,
            refUID: value.ref_uid.parse()?,
            data: value.data.into(),
            value: value.value.try_into()?,
        })
    }
}

impl TryFrom<AttestationRequest> for alkahest_rs::contracts::IEAS::AttestationRequest {
    type Error = eyre::Error;

    fn try_from(value: AttestationRequest) -> eyre::Result<Self> {
        let schema: FixedBytes<32> = value.schema.parse()?;
        Ok(Self {
            schema,
            data: value.data.try_into()?,
        })
    }
}

#[derive(IntoPyObject)]
pub struct LogWithHash<T> {
    pub log: T,
    pub transaction_hash: String,
}

#[pyclass]
#[derive(Clone)]
pub struct PyDefaultExtensionConfig {
    #[pyo3(get)]
    pub erc20_addresses: Option<PyErc20Addresses>,
    #[pyo3(get)]
    pub erc721_addresses: Option<PyErc721Addresses>,
    #[pyo3(get)]
    pub erc1155_addresses: Option<PyErc1155Addresses>,
    #[pyo3(get)]
    pub native_token_addresses: Option<PyNativeTokenAddresses>,
    #[pyo3(get)]
    pub token_bundle_addresses: Option<PyTokenBundleAddresses>,
    #[pyo3(get)]
    pub attestation_addresses: Option<PyAttestationAddresses>,
    #[pyo3(get)]
    pub arbiters_addresses: Option<PyArbitersAddresses>,
    #[pyo3(get)]
    pub string_obligation_addresses: Option<PyStringObligationAddresses>,
    #[pyo3(get)]
    pub commit_reveal_obligation_addresses: Option<PyCommitRevealObligationAddresses>,
}

impl From<&alkahest_rs::DefaultExtensionConfig> for PyDefaultExtensionConfig {
    fn from(data: &alkahest_rs::DefaultExtensionConfig) -> Self {
        Self {
            erc20_addresses: Some(PyErc20Addresses::from(&data.erc20_addresses)),
            erc721_addresses: Some(PyErc721Addresses::from(&data.erc721_addresses)),
            erc1155_addresses: Some(PyErc1155Addresses::from(&data.erc1155_addresses)),
            native_token_addresses: Some(PyNativeTokenAddresses::from(
                &data.native_token_addresses,
            )),
            token_bundle_addresses: Some(PyTokenBundleAddresses::from(
                &data.token_bundle_addresses,
            )),
            attestation_addresses: Some(PyAttestationAddresses::from(&data.attestation_addresses)),
            arbiters_addresses: Some(PyArbitersAddresses::from(&data.arbiters_addresses)),
            string_obligation_addresses: Some(PyStringObligationAddresses::from(
                &data.string_obligation_addresses,
            )),
            commit_reveal_obligation_addresses: Some(PyCommitRevealObligationAddresses::from(
                &data.commit_reveal_obligation_addresses,
            )),
        }
    }
}

#[pymethods]
impl PyDefaultExtensionConfig {
    /// Return the address config for one of the SDK's known chains.
    ///
    /// Mirrors the TS SDK's chain-name-keyed lookup. Accepted names:
    ///   "base_sepolia"        — default; matches the Rust `Default` impl
    ///   "ethereum_sepolia"
    ///   "ethereum_mainnet"
    ///   "filecoin_calibration"
    ///   "genlayer_bradbury"
    ///
    /// For local anvil or any chain not in this list, construct a
    /// `DefaultExtensionConfig` manually from the address sub-types.
    #[classmethod]
    fn for_chain(_cls: &Bound<'_, PyType>, name: &str) -> PyResult<Self> {
        let normalized = name.trim().to_ascii_lowercase();
        let cfg: &alkahest_rs::DefaultExtensionConfig = match normalized.as_str() {
            "base_sepolia" => &alkahest_rs::addresses::BASE_SEPOLIA_ADDRESSES,
            "ethereum_sepolia" => &alkahest_rs::addresses::ETHEREUM_SEPOLIA_ADDRESSES,
            "ethereum_mainnet" | "ethereum" | "mainnet" => {
                &alkahest_rs::addresses::ETHEREUM_ADDRESSES
            }
            "filecoin_calibration" => &alkahest_rs::addresses::FILECOIN_CALIBRATION_ADDRESSES,
            "genlayer_bradbury" => &alkahest_rs::addresses::GENLAYER_BRADBURY_ADDRESSES,
            other => {
                return Err(PyValueError::new_err(format!(
                    "Unknown chain '{}'. Supported: {:?}",
                    other,
                    Self::supported_chains_inner(),
                )));
            }
        };
        Ok(Self::from(cfg))
    }

    /// Return the list of chain names accepted by `for_chain`.
    #[classmethod]
    fn supported_chains(_cls: &Bound<'_, PyType>) -> Vec<String> {
        Self::supported_chains_inner()
    }

    /// Return the SDK default config (Base Sepolia). Equivalent to passing
    /// `None` as `address_config` to `AlkahestClient`, but explicit.
    #[classmethod]
    fn default_config(_cls: &Bound<'_, PyType>) -> Self {
        Self::from(&alkahest_rs::addresses::BASE_SEPOLIA_ADDRESSES)
    }
}

impl PyDefaultExtensionConfig {
    fn supported_chains_inner() -> Vec<String> {
        vec![
            "base_sepolia".to_string(),
            "ethereum_sepolia".to_string(),
            "ethereum_mainnet".to_string(),
            "filecoin_calibration".to_string(),
            "genlayer_bradbury".to_string(),
        ]
    }
}

macro_rules! py_address_struct {
    ($name:ident, $src:path) => {
        #[pyclass]
        #[derive(Clone)]
        pub struct $name {
            #[pyo3(get)]
            pub eas: String,
            #[pyo3(get)]
            pub barter_utils: String,
            #[pyo3(get)]
            pub escrow_obligation_default: String,
            #[pyo3(get)]
            pub escrow_obligation_unconditional: String,
            #[pyo3(get)]
            pub payment_obligation: String,
        }

        #[pymethods]
        impl $name {
            #[new]
            pub fn new(
                eas: String,
                barter_utils: String,
                escrow_obligation_default: String,
                escrow_obligation_unconditional: String,
                payment_obligation: String,
            ) -> Self {
                Self {
                    eas,
                    barter_utils,
                    escrow_obligation_default,
                    escrow_obligation_unconditional,
                    payment_obligation,
                }
            }
        }

        impl From<&$src> for $name {
            fn from(data: &$src) -> Self {
                Self {
                    eas: format!("{:?}", data.eas),
                    barter_utils: format!("{:?}", data.barter_utils),
                    escrow_obligation_default: format!("{:?}", data.escrow_obligation_default),
                    escrow_obligation_unconditional: format!(
                        "{:?}",
                        data.escrow_obligation_unconditional
                    ),
                    payment_obligation: format!("{:?}", data.payment_obligation),
                }
            }
        }
    };
}

py_address_struct!(
    PyErc20Addresses,
    alkahest_rs::clients::erc20::Erc20Addresses
);
py_address_struct!(
    PyErc721Addresses,
    alkahest_rs::clients::erc721::Erc721Addresses
);
py_address_struct!(
    PyErc1155Addresses,
    alkahest_rs::clients::erc1155::Erc1155Addresses
);
py_address_struct!(
    PyTokenBundleAddresses,
    alkahest_rs::clients::token_bundle::TokenBundleAddresses
);
py_address_struct!(
    PyNativeTokenAddresses,
    alkahest_rs::clients::native_token::NativeTokenAddresses
);

#[pyclass]
#[derive(Clone)]
pub struct PyAttestationAddresses {
    #[pyo3(get)]
    pub eas: String,
    #[pyo3(get)]
    pub eas_schema_registry: String,
    #[pyo3(get)]
    pub barter_utils: String,
    #[pyo3(get)]
    pub escrow_obligation_default: String,
    #[pyo3(get)]
    pub escrow_obligation_unconditional: String,
    #[pyo3(get)]
    pub escrow_obligation_2_default: String,
    #[pyo3(get)]
    pub escrow_obligation_2_unconditional: String,
}

#[pymethods]
impl PyAttestationAddresses {
    #[new]
    pub fn new(
        eas: String,
        eas_schema_registry: String,
        barter_utils: String,
        escrow_obligation_default: String,
        escrow_obligation_unconditional: String,
        escrow_obligation_2_default: String,
        escrow_obligation_2_unconditional: String,
    ) -> Self {
        Self {
            eas,
            eas_schema_registry,
            barter_utils,
            escrow_obligation_default,
            escrow_obligation_unconditional,
            escrow_obligation_2_default,
            escrow_obligation_2_unconditional,
        }
    }
}

impl From<&alkahest_rs::clients::attestation::AttestationAddresses> for PyAttestationAddresses {
    fn from(data: &alkahest_rs::clients::attestation::AttestationAddresses) -> Self {
        Self {
            eas: format!("{:?}", data.eas),
            eas_schema_registry: format!("{:?}", data.eas_schema_registry),
            barter_utils: format!("{:?}", data.barter_utils),
            escrow_obligation_default: format!("{:?}", data.escrow_obligation_default),
            escrow_obligation_unconditional: format!("{:?}", data.escrow_obligation_unconditional),
            escrow_obligation_2_default: format!("{:?}", data.escrow_obligation_2_default),
            escrow_obligation_2_unconditional: format!(
                "{:?}",
                data.escrow_obligation_2_unconditional
            ),
        }
    }
}
#[pyclass]
#[derive(Clone)]
pub struct PyArbitersAddresses {
    #[pyo3(get)]
    pub eas: String,
    #[pyo3(get)]
    pub trivial_arbiter: String,
    #[pyo3(get)]
    pub trusted_oracle_arbiter: String,
    #[pyo3(get)]
    pub intrinsics_arbiter: String,
    #[pyo3(get)]
    pub erc8004_arbiter: String,
    #[pyo3(get)]
    pub any_arbiter: String,
    #[pyo3(get)]
    pub all_arbiter: String,
    #[pyo3(get)]
    pub attester_arbiter: String,
    #[pyo3(get)]
    pub expiration_time_after_arbiter: String,
    #[pyo3(get)]
    pub expiration_time_before_arbiter: String,
    #[pyo3(get)]
    pub expiration_time_equal_arbiter: String,
    #[pyo3(get)]
    pub recipient_arbiter: String,
    #[pyo3(get)]
    pub ref_uid_arbiter: String,
    #[pyo3(get)]
    pub revocable_arbiter: String,
    #[pyo3(get)]
    pub schema_arbiter: String,
    #[pyo3(get)]
    pub time_after_arbiter: String,
    #[pyo3(get)]
    pub time_before_arbiter: String,
    #[pyo3(get)]
    pub time_equal_arbiter: String,
    #[pyo3(get)]
    pub uid_arbiter: String,
    #[pyo3(get)]
    pub exclusive_revocable_confirmation_arbiter: String,
    #[pyo3(get)]
    pub exclusive_unrevocable_confirmation_arbiter: String,
    #[pyo3(get)]
    pub nonexclusive_revocable_confirmation_arbiter: String,
    #[pyo3(get)]
    pub nonexclusive_unrevocable_confirmation_arbiter: String,
}

impl From<&alkahest_rs::clients::arbiters::ArbitersAddresses> for PyArbitersAddresses {
    fn from(data: &alkahest_rs::clients::arbiters::ArbitersAddresses) -> Self {
        Self {
            eas: format!("{:?}", data.eas),
            trivial_arbiter: format!("{:?}", data.trivial_arbiter),
            trusted_oracle_arbiter: format!("{:?}", data.trusted_oracle_arbiter),
            intrinsics_arbiter: format!("{:?}", data.intrinsics_arbiter),
            erc8004_arbiter: format!("{:?}", data.erc8004_arbiter),
            any_arbiter: format!("{:?}", data.any_arbiter),
            all_arbiter: format!("{:?}", data.all_arbiter),
            attester_arbiter: format!("{:?}", data.attester_arbiter),
            expiration_time_after_arbiter: format!("{:?}", data.expiration_time_after_arbiter),
            expiration_time_before_arbiter: format!("{:?}", data.expiration_time_before_arbiter),
            expiration_time_equal_arbiter: format!("{:?}", data.expiration_time_equal_arbiter),
            recipient_arbiter: format!("{:?}", data.recipient_arbiter),
            ref_uid_arbiter: format!("{:?}", data.ref_uid_arbiter),
            revocable_arbiter: format!("{:?}", data.revocable_arbiter),
            schema_arbiter: format!("{:?}", data.schema_arbiter),
            time_after_arbiter: format!("{:?}", data.time_after_arbiter),
            time_before_arbiter: format!("{:?}", data.time_before_arbiter),
            time_equal_arbiter: format!("{:?}", data.time_equal_arbiter),
            uid_arbiter: format!("{:?}", data.uid_arbiter),
            exclusive_revocable_confirmation_arbiter: format!(
                "{:?}",
                data.exclusive_revocable_confirmation_arbiter
            ),
            exclusive_unrevocable_confirmation_arbiter: format!(
                "{:?}",
                data.exclusive_unrevocable_confirmation_arbiter
            ),
            nonexclusive_revocable_confirmation_arbiter: format!(
                "{:?}",
                data.nonexclusive_revocable_confirmation_arbiter
            ),
            nonexclusive_unrevocable_confirmation_arbiter: format!(
                "{:?}",
                data.nonexclusive_unrevocable_confirmation_arbiter
            ),
        }
    }
}
#[pyclass]
#[derive(Clone)]
pub struct PyStringObligationAddresses {
    #[pyo3(get)]
    pub eas: String,
    #[pyo3(get)]
    pub obligation: String,
}

#[pymethods]
impl PyStringObligationAddresses {
    #[new]
    pub fn new(eas: String, obligation: String) -> Self {
        Self { eas, obligation }
    }
}

impl From<&alkahest_rs::clients::string_obligation::StringObligationAddresses>
    for PyStringObligationAddresses
{
    fn from(data: &alkahest_rs::clients::string_obligation::StringObligationAddresses) -> Self {
        Self {
            eas: format!("{:?}", data.eas),
            obligation: format!("{:?}", data.obligation),
        }
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyCommitRevealObligationAddresses {
    #[pyo3(get)]
    pub eas: String,
    #[pyo3(get)]
    pub obligation: String,
}

#[pymethods]
impl PyCommitRevealObligationAddresses {
    #[new]
    pub fn new(eas: String, obligation: String) -> Self {
        Self { eas, obligation }
    }
}

impl From<&alkahest_rs::clients::commit_reveal_obligation::CommitRevealObligationAddresses>
    for PyCommitRevealObligationAddresses
{
    fn from(
        data: &alkahest_rs::clients::commit_reveal_obligation::CommitRevealObligationAddresses,
    ) -> Self {
        Self {
            eas: format!("{:?}", data.eas),
            obligation: format!("{:?}", data.obligation),
        }
    }
}
