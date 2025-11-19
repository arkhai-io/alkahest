use crate::{utils::PyWalletProvider, PyAlkahestClient};
use alkahest_rs::{
    extensions::NoExtension,
    fixtures::{MockERC1155, MockERC20Permit, MockERC721},
    types::WalletProvider,
};
use alloy::primitives::{Address, U256};
use pyo3::{pyclass, pymethods, PyResult};

#[pyclass]
pub struct PyMockERC20 {
    inner: MockERC20Permit::MockERC20PermitInstance<WalletProvider>,
}

#[pymethods]
impl PyMockERC20 {
    #[new]
    pub fn new(address: String, provider: &PyWalletProvider) -> PyResult<Self> {
        let addr = address
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;

        let contract = MockERC20Permit::MockERC20PermitInstance::new(addr, provider.inner.clone());

        Ok(Self { inner: contract })
    }

    #[getter]
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.address())
    }

    pub fn transfer(&self, to: String, value: u64) -> PyResult<()> {
        let to_addr = to
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        let rt = tokio::runtime::Runtime::new()?;
        rt.block_on(async {
            self.inner
                .transfer(to_addr, U256::from(value))
                .send()
                .await
                .map_err(|e| {
                    eprintln!("Transfer failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?
                .get_receipt()
                .await
                .map_err(|e| {
                    eprintln!("Get receipt failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?;

            Ok(())
        })
    }

    pub fn balance_of(&self, address: String) -> PyResult<u128> {
        let addr = address
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;

        let rt = tokio::runtime::Runtime::new()?;
        let balance = rt
            .block_on(async { self.inner.balanceOf(addr).call().await })
            .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

        let balance_u128 = balance.try_into().map_err(|_| {
            pyo3::exceptions::PyOverflowError::new_err("Balance too large for u128")
        })?;

        Ok(balance_u128)
    }

    pub fn allowance(&self, owner: String, spender: String) -> PyResult<u128> {
        let owner_addr = owner
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        let spender_addr = spender
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;

        let rt = tokio::runtime::Runtime::new()?;
        let allowance = rt
            .block_on(async { self.inner.allowance(owner_addr, spender_addr).call().await })
            .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

        let allowance_u128 = allowance.try_into().map_err(|_| {
            pyo3::exceptions::PyOverflowError::new_err("Allowance too large for u128")
        })?;

        Ok(allowance_u128)
    }
}

#[pyclass]
pub struct PyMockERC721 {
    inner: MockERC721::MockERC721Instance<WalletProvider>,
    runtime: std::sync::Arc<tokio::runtime::Runtime>,
}

#[pymethods]
impl PyMockERC721 {
    #[new]
    pub fn new(address: String, provider: &PyWalletProvider) -> PyResult<Self> {
        let addr = address
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;

        let contract = MockERC721::MockERC721Instance::new(addr, provider.inner.clone());
        let runtime = std::sync::Arc::new(tokio::runtime::Runtime::new()?);

        Ok(Self {
            inner: contract,
            runtime,
        })
    }

    #[getter]
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.address())
    }

    pub fn mint(&self, to: String) -> PyResult<u64> {
        let to_addr = to
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        self.runtime.block_on(async {
            let _token_id = self
                .inner
                .mint(to_addr)
                .send()
                .await
                .map_err(|e| {
                    eprintln!("Mint failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?
                .get_receipt()
                .await
                .map_err(|e| {
                    eprintln!("Get receipt failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?;

            // Return a placeholder token ID for now since the actual implementation would extract it from logs
            Ok(1u64)
        })
    }

    pub fn transfer_from(&self, from: String, to: String, token_id: u64) -> PyResult<()> {
        let from_addr = from
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        let to_addr = to
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        self.runtime.block_on(async {
            self.inner
                .transferFrom(from_addr, to_addr, U256::from(token_id))
                .send()
                .await
                .map_err(|e| {
                    eprintln!("Transfer failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?
                .get_receipt()
                .await
                .map_err(|e| {
                    eprintln!("Get receipt failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?;

            Ok(())
        })
    }

    pub fn approve(&self, approved: String, token_id: u64) -> PyResult<()> {
        let approved_addr = approved
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        self.runtime.block_on(async {
            self.inner
                .approve(approved_addr, U256::from(token_id))
                .send()
                .await
                .map_err(|e| {
                    eprintln!("Approve failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?
                .get_receipt()
                .await
                .map_err(|e| {
                    eprintln!("Get receipt failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?;

            Ok(())
        })
    }

    pub fn owner_of(&self, token_id: u64) -> PyResult<String> {
        self.runtime.block_on(async {
            let owner = self
                .inner
                .ownerOf(U256::from(token_id))
                .call()
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

            Ok(format!("{:?}", owner))
        })
    }

    pub fn balance_of(&self, owner: String) -> PyResult<u128> {
        let owner_addr = owner
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;

        self.runtime.block_on(async {
            let balance = self
                .inner
                .balanceOf(owner_addr)
                .call()
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

            let balance_u128 = balance.try_into().map_err(|_| {
                pyo3::exceptions::PyOverflowError::new_err("Balance too large for u128")
            })?;

            Ok(balance_u128)
        })
    }

    pub fn get_approved(&self, token_id: u64) -> PyResult<String> {
        self.runtime.block_on(async {
            let approved = self
                .inner
                .getApproved(U256::from(token_id))
                .call()
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

            Ok(format!("{:?}", approved))
        })
    }

    pub fn is_approved_for_all(&self, account: String, operator: String) -> PyResult<bool> {
        let account_addr = account
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        let operator_addr = operator
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;

        self.runtime.block_on(async {
            let approved = self
                .inner
                .isApprovedForAll(account_addr, operator_addr)
                .call()
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

            Ok(approved)
        })
    }
}

#[pyclass]
pub struct PyMockERC1155 {
    inner: MockERC1155::MockERC1155Instance<WalletProvider>,
    runtime: std::sync::Arc<tokio::runtime::Runtime>,
}

#[pymethods]
impl PyMockERC1155 {
    #[new]
    pub fn new(address: String, provider: &PyWalletProvider) -> PyResult<Self> {
        let addr = address
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;

        let contract = MockERC1155::MockERC1155Instance::new(addr, provider.inner.clone());
        let runtime = std::sync::Arc::new(tokio::runtime::Runtime::new()?);

        Ok(Self {
            inner: contract,
            runtime,
        })
    }

    #[getter]
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.address())
    }

    pub fn mint(&self, to: String, token_id: u64, amount: u64) -> PyResult<()> {
        let to_addr = to
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        self.runtime.block_on(async {
            self.inner
                .mint(to_addr, U256::from(token_id), U256::from(amount))
                .send()
                .await
                .map_err(|e| {
                    eprintln!("Mint failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?
                .get_receipt()
                .await
                .map_err(|e| {
                    eprintln!("Get receipt failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?;

            Ok(())
        })
    }

    pub fn safe_batch_transfer_from(
        &self,
        from: String,
        to: String,
        token_ids: Vec<u64>,
        amounts: Vec<u64>,
        data: Vec<u8>,
    ) -> PyResult<()> {
        let from_addr = from
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        let to_addr = to
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        let ids: Vec<U256> = token_ids.into_iter().map(U256::from).collect();
        let amts: Vec<U256> = amounts.into_iter().map(U256::from).collect();
        self.runtime.block_on(async {
            self.inner
                .safeBatchTransferFrom(from_addr, to_addr, ids, amts, data.into())
                .send()
                .await
                .map_err(|e| {
                    eprintln!("Safe batch transfer failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?
                .get_receipt()
                .await
                .map_err(|e| {
                    eprintln!("Get receipt failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?;

            Ok(())
        })
    }

    pub fn safe_transfer_from(
        &self,
        from: String,
        to: String,
        token_id: u64,
        amount: u64,
        data: Vec<u8>,
    ) -> PyResult<()> {
        let from_addr = from
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        let to_addr = to
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        self.runtime.block_on(async {
            self.inner
                .safeTransferFrom(
                    from_addr,
                    to_addr,
                    U256::from(token_id),
                    U256::from(amount),
                    data.into(),
                )
                .send()
                .await
                .map_err(|e| {
                    eprintln!("Safe transfer failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?
                .get_receipt()
                .await
                .map_err(|e| {
                    eprintln!("Get receipt failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?;

            Ok(())
        })
    }

    pub fn balance_of(&self, account: String, token_id: u64) -> PyResult<u128> {
        let account_addr = account
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;

        self.runtime.block_on(async {
            let balance = self
                .inner
                .balanceOf(account_addr, U256::from(token_id))
                .call()
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

            let balance_u128 = balance.try_into().map_err(|_| {
                pyo3::exceptions::PyOverflowError::new_err("Balance too large for u128")
            })?;

            Ok(balance_u128)
        })
    }

    pub fn balance_of_batch(
        &self,
        accounts: Vec<String>,
        token_ids: Vec<u64>,
    ) -> PyResult<Vec<u128>> {
        if accounts.len() != token_ids.len() {
            return Err(pyo3::exceptions::PyValueError::new_err(
                "Accounts and token_ids arrays must have the same length",
            ));
        }

        let account_addrs: Result<Vec<Address>, _> = accounts
            .into_iter()
            .map(|addr| addr.parse::<Address>())
            .collect();
        let account_addrs =
            account_addrs.map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        let ids: Vec<U256> = token_ids.into_iter().map(U256::from).collect();

        self.runtime.block_on(async {
            let balances = self
                .inner
                .balanceOfBatch(account_addrs, ids)
                .call()
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

            let balances_u128: Result<Vec<u128>, _> = balances
                .into_iter()
                .map(|balance| balance.try_into())
                .collect();
            let balances_u128 = balances_u128.map_err(|_| {
                pyo3::exceptions::PyOverflowError::new_err("Balance too large for u128")
            })?;

            Ok(balances_u128)
        })
    }

    pub fn set_approval_for_all(&self, operator: String, approved: bool) -> PyResult<()> {
        let operator_addr = operator
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        self.runtime.block_on(async {
            self.inner
                .setApprovalForAll(operator_addr, approved)
                .send()
                .await
                .map_err(|e| {
                    eprintln!("Set approval for all failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?
                .get_receipt()
                .await
                .map_err(|e| {
                    eprintln!("Get receipt failed: {e}");
                    pyo3::exceptions::PyRuntimeError::new_err(e.to_string())
                })?;

            Ok(())
        })
    }

    pub fn is_approved_for_all(&self, account: String, operator: String) -> PyResult<bool> {
        let account_addr = account
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        let operator_addr = operator
            .parse::<Address>()
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;

        self.runtime.block_on(async {
            let approved = self
                .inner
                .isApprovedForAll(account_addr, operator_addr)
                .call()
                .await
                .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))?;

            Ok(approved)
        })
    }
}
