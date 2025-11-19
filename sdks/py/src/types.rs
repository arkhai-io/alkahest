use alkahest_rs::{contracts::IEAS::Attested, sol_types::EscrowClaimed};
use alloy::primitives::{FixedBytes, U256};
use pyo3::{exceptions::PyValueError, pyclass, FromPyObject, IntoPyObject, PyErr, PyResult};

macro_rules! client_address_config {
    ($name:ident) => {
        #[derive(FromPyObject)]
        pub struct $name {
            pub eas: String,
            pub barter_utils: String,
            pub escrow_obligation: String,
            pub payment_obligation: String,
        }
    };
}

client_address_config!(Erc20Addresses);
client_address_config!(Erc721Addresses);
client_address_config!(Erc1155Addresses);
client_address_config!(TokenBundleAddresses);

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
    pub escrow_obligation: String,
    pub escrow_obligation_2: String,
}

#[derive(FromPyObject)]
pub struct ArbitersAddresses {
    pub eas: String,
    pub trusted_party_arbiter: String,
    pub trivial_arbiter: String,
    pub specific_attestation_arbiter: String,
    pub trusted_oracle_arbiter: String,
    pub intrinsics_arbiter: String,
    pub intrinsics_arbiter_2: String,
    pub any_arbiter: String,
    pub all_arbiter: String,
    pub uid_arbiter: String,
    pub recipient_arbiter: String,
    pub not_arbiter: String,
    pub attester_arbiter_composing: String,
    pub attester_arbiter_non_composing: String,
    pub expiration_time_after_arbiter_composing: String,
    pub expiration_time_before_arbiter_composing: String,
    pub expiration_time_equal_arbiter_composing: String,
    pub recipient_arbiter_composing: String,
    pub ref_uid_arbiter_composing: String,
    pub revocable_arbiter_composing: String,
    pub schema_arbiter_composing: String,
    pub time_after_arbiter_composing: String,
    pub time_before_arbiter_composing: String,
    pub time_equal_arbiter_composing: String,
    pub uid_arbiter_composing: String,
    pub erc20_payment_fulfillment_arbiter: String,
    pub erc721_payment_fulfillment_arbiter: String,
    pub erc1155_payment_fulfillment_arbiter: String,
    pub token_bundle_payment_fulfillment_arbiter: String,
    pub expiration_time_after_arbiter_non_composing: String,
    pub expiration_time_before_arbiter_non_composing: String,
    pub expiration_time_equal_arbiter_non_composing: String,
    pub recipient_arbiter_non_composing: String,
    pub ref_uid_arbiter_non_composing: String,
    pub revocable_arbiter_non_composing: String,
    pub schema_arbiter_non_composing: String,
    pub time_after_arbiter_non_composing: String,
    pub time_before_arbiter_non_composing: String,
    pub time_equal_arbiter_non_composing: String,
    pub uid_arbiter_non_composing: String,
    pub confirmation_arbiter: String,
    pub confirmation_arbiter_composing: String,
    pub revocable_confirmation_arbiter: String,
    pub revocable_confirmation_arbiter_composing: String,
    pub unrevocable_confirmation_arbiter: String,
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
pub struct DefaultExtensionConfig {
    pub erc20_addresses: Option<Erc20Addresses>,
    pub erc721_addresses: Option<Erc721Addresses>,
    pub erc1155_addresses: Option<Erc1155Addresses>,
    pub token_bundle_addresses: Option<TokenBundleAddresses>,
    pub attestation_addresses: Option<AttestationAddresses>,
    pub arbiters_addresses: Option<ArbitersAddresses>,
    pub string_obligation_addresses: Option<StringObligationAddresses>,
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
                    escrow_obligation: parse_address!(escrow_obligation),
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
            escrow_obligation: parse_address!(escrow_obligation),
            escrow_obligation_2: parse_address!(escrow_obligation_2),
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
            erc20_addresses: value.erc20_addresses.and_then(|x| x.try_into().ok()).unwrap_or_default(),
            erc721_addresses: value.erc721_addresses.and_then(|x| x.try_into().ok()).unwrap_or_default(),
            erc1155_addresses: value.erc1155_addresses.and_then(|x| x.try_into().ok()).unwrap_or_default(),
            token_bundle_addresses: value.token_bundle_addresses.and_then(|x| x.try_into().ok()).unwrap_or_default(),
            attestation_addresses: value.attestation_addresses.and_then(|x| x.try_into().ok()).unwrap_or_default(),
            arbiters_addresses: value.arbiters_addresses.and_then(|x| x.try_into().ok()).unwrap_or_default(),
            string_obligation_addresses: value
                .string_obligation_addresses
                .and_then(|x| x.try_into().ok()).unwrap_or_default(),
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
            trusted_party_arbiter: parse_address!(trusted_party_arbiter),
            trivial_arbiter: parse_address!(trivial_arbiter),
            specific_attestation_arbiter: parse_address!(specific_attestation_arbiter),
            trusted_oracle_arbiter: parse_address!(trusted_oracle_arbiter),
            intrinsics_arbiter: parse_address!(intrinsics_arbiter),
            intrinsics_arbiter_2: parse_address!(intrinsics_arbiter_2),
            any_arbiter: parse_address!(any_arbiter),
            all_arbiter: parse_address!(all_arbiter),
            uid_arbiter: parse_address!(uid_arbiter),
            recipient_arbiter: parse_address!(recipient_arbiter),
            not_arbiter: parse_address!(not_arbiter),
            attester_arbiter_composing: parse_address!(attester_arbiter_composing),
            attester_arbiter_non_composing: parse_address!(attester_arbiter_non_composing),
            expiration_time_after_arbiter_composing: parse_address!(
                expiration_time_after_arbiter_composing
            ),
            expiration_time_before_arbiter_composing: parse_address!(
                expiration_time_before_arbiter_composing
            ),
            expiration_time_equal_arbiter_composing: parse_address!(
                expiration_time_equal_arbiter_composing
            ),
            recipient_arbiter_composing: parse_address!(recipient_arbiter_composing),
            ref_uid_arbiter_composing: parse_address!(ref_uid_arbiter_composing),
            revocable_arbiter_composing: parse_address!(revocable_arbiter_composing),
            schema_arbiter_composing: parse_address!(schema_arbiter_composing),
            time_after_arbiter_composing: parse_address!(time_after_arbiter_composing),
            time_before_arbiter_composing: parse_address!(time_before_arbiter_composing),
            time_equal_arbiter_composing: parse_address!(time_equal_arbiter_composing),
            uid_arbiter_composing: parse_address!(uid_arbiter_composing),
            erc20_payment_fulfillment_arbiter: parse_address!(erc20_payment_fulfillment_arbiter),
            erc721_payment_fulfillment_arbiter: parse_address!(erc721_payment_fulfillment_arbiter),
            erc1155_payment_fulfillment_arbiter: parse_address!(
                erc1155_payment_fulfillment_arbiter
            ),
            token_bundle_payment_fulfillment_arbiter: parse_address!(
                token_bundle_payment_fulfillment_arbiter
            ),
            expiration_time_after_arbiter_non_composing: parse_address!(
                expiration_time_after_arbiter_non_composing
            ),
            expiration_time_before_arbiter_non_composing: parse_address!(
                expiration_time_before_arbiter_non_composing
            ),
            expiration_time_equal_arbiter_non_composing: parse_address!(
                expiration_time_equal_arbiter_non_composing
            ),
            recipient_arbiter_non_composing: parse_address!(recipient_arbiter_non_composing),
            ref_uid_arbiter_non_composing: parse_address!(ref_uid_arbiter_non_composing),
            revocable_arbiter_non_composing: parse_address!(revocable_arbiter_non_composing),
            schema_arbiter_non_composing: parse_address!(schema_arbiter_non_composing),
            time_after_arbiter_non_composing: parse_address!(time_after_arbiter_non_composing),
            time_before_arbiter_non_composing: parse_address!(time_before_arbiter_non_composing),
            time_equal_arbiter_non_composing: parse_address!(time_equal_arbiter_non_composing),
            uid_arbiter_non_composing: parse_address!(uid_arbiter_non_composing),
            confirmation_arbiter: parse_address!(confirmation_arbiter),
            confirmation_arbiter_composing: parse_address!(confirmation_arbiter_composing),
            revocable_confirmation_arbiter: parse_address!(revocable_confirmation_arbiter),
            revocable_confirmation_arbiter_composing: parse_address!(
                revocable_confirmation_arbiter_composing
            ),
            unrevocable_confirmation_arbiter: parse_address!(unrevocable_confirmation_arbiter),
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
pub struct TokenBundleData {
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
    pub token_bundle_addresses: Option<PyTokenBundleAddresses>,
    #[pyo3(get)]
    pub attestation_addresses: Option<PyAttestationAddresses>,
    #[pyo3(get)]
    pub arbiters_addresses: Option<PyArbitersAddresses>,
    #[pyo3(get)]
    pub string_obligation_addresses: Option<PyStringObligationAddresses>,
}

impl From<&alkahest_rs::DefaultExtensionConfig> for PyDefaultExtensionConfig {
    fn from(data: &alkahest_rs::DefaultExtensionConfig) -> Self {
        Self {
            erc20_addresses: Some(PyErc20Addresses::from(&data.erc20_addresses)),
            erc721_addresses: Some(PyErc721Addresses::from(&data.erc721_addresses)),
            erc1155_addresses: Some(PyErc1155Addresses::from(&data.erc1155_addresses)),
            token_bundle_addresses: Some(PyTokenBundleAddresses::from(&data.token_bundle_addresses)),
            attestation_addresses: Some(PyAttestationAddresses::from(&data.attestation_addresses)),
            arbiters_addresses: Some(PyArbitersAddresses::from(&data.arbiters_addresses)),
            string_obligation_addresses: Some(PyStringObligationAddresses::from(&data.string_obligation_addresses)),
        }
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
            pub escrow_obligation: String,
            #[pyo3(get)]
            pub payment_obligation: String,
        }

        #[pymethods]
        impl $name {
            #[new]
            pub fn new(
                eas: String,
                barter_utils: String,
                escrow_obligation: String,
                payment_obligation: String,
            ) -> Self {
                Self {
                    eas,
                    barter_utils,
                    escrow_obligation,
                    payment_obligation,
                }
            }
        }

        impl From<&$src> for $name {
            fn from(data: &$src) -> Self {
                Self {
                    eas: format!("{:?}", data.eas),
                    barter_utils: format!("{:?}", data.barter_utils),
                    escrow_obligation: format!("{:?}", data.escrow_obligation),
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
    pub escrow_obligation: String,
    #[pyo3(get)]
    pub escrow_obligation_2: String,
}

#[pymethods]
impl PyAttestationAddresses {
    #[new]
    pub fn new(
        eas: String,
        eas_schema_registry: String,
        barter_utils: String,
        escrow_obligation: String,
        escrow_obligation_2: String,
    ) -> Self {
        Self {
            eas,
            eas_schema_registry,
            barter_utils,
            escrow_obligation,
            escrow_obligation_2,
        }
    }
}

impl From<&alkahest_rs::clients::attestation::AttestationAddresses> for PyAttestationAddresses {
    fn from(data: &alkahest_rs::clients::attestation::AttestationAddresses) -> Self {
        Self {
            eas: format!("{:?}", data.eas),
            eas_schema_registry: format!("{:?}", data.eas_schema_registry),
            barter_utils: format!("{:?}", data.barter_utils),
            escrow_obligation: format!("{:?}", data.escrow_obligation),
            escrow_obligation_2: format!("{:?}", data.escrow_obligation_2),
        }
    }
}
#[pyclass]
#[derive(Clone)]
pub struct PyArbitersAddresses {
    #[pyo3(get)]
    pub eas: String,
    #[pyo3(get)]
    pub trusted_party_arbiter: String,
    #[pyo3(get)]
    pub trivial_arbiter: String,
    #[pyo3(get)]
    pub specific_attestation_arbiter: String,
    #[pyo3(get)]
    pub trusted_oracle_arbiter: String,
    #[pyo3(get)]
    pub intrinsics_arbiter: String,
    #[pyo3(get)]
    pub intrinsics_arbiter_2: String,
    #[pyo3(get)]
    pub any_arbiter: String,
    #[pyo3(get)]
    pub all_arbiter: String,
    #[pyo3(get)]
    pub uid_arbiter: String,
    #[pyo3(get)]
    pub recipient_arbiter: String,
    #[pyo3(get)]
    pub not_arbiter: String,
    #[pyo3(get)]
    pub attester_arbiter_composing: String,
    #[pyo3(get)]
    pub attester_arbiter_non_composing: String,
    #[pyo3(get)]
    pub expiration_time_after_arbiter_composing: String,
    #[pyo3(get)]
    pub expiration_time_before_arbiter_composing: String,
    #[pyo3(get)]
    pub expiration_time_equal_arbiter_composing: String,
    #[pyo3(get)]
    pub recipient_arbiter_composing: String,
    #[pyo3(get)]
    pub ref_uid_arbiter_composing: String,
    #[pyo3(get)]
    pub revocable_arbiter_composing: String,
    #[pyo3(get)]
    pub schema_arbiter_composing: String,
    #[pyo3(get)]
    pub time_after_arbiter_composing: String,
    #[pyo3(get)]
    pub time_before_arbiter_composing: String,
    #[pyo3(get)]
    pub time_equal_arbiter_composing: String,
    #[pyo3(get)]
    pub uid_arbiter_composing: String,
    #[pyo3(get)]
    pub erc20_payment_fulfillment_arbiter: String,
    #[pyo3(get)]
    pub erc721_payment_fulfillment_arbiter: String,
    #[pyo3(get)]
    pub erc1155_payment_fulfillment_arbiter: String,
    #[pyo3(get)]
    pub token_bundle_payment_fulfillment_arbiter: String,
    #[pyo3(get)]
    pub expiration_time_after_arbiter_non_composing: String,
    #[pyo3(get)]
    pub expiration_time_before_arbiter_non_composing: String,
    #[pyo3(get)]
    pub expiration_time_equal_arbiter_non_composing: String,
    #[pyo3(get)]
    pub recipient_arbiter_non_composing: String,
    #[pyo3(get)]
    pub ref_uid_arbiter_non_composing: String,
    #[pyo3(get)]
    pub revocable_arbiter_non_composing: String,
    #[pyo3(get)]
    pub schema_arbiter_non_composing: String,
    #[pyo3(get)]
    pub time_after_arbiter_non_composing: String,
    #[pyo3(get)]
    pub time_before_arbiter_non_composing: String,
    #[pyo3(get)]
    pub time_equal_arbiter_non_composing: String,
    #[pyo3(get)]
    pub uid_arbiter_non_composing: String,
    #[pyo3(get)]
    pub confirmation_arbiter: String,
    #[pyo3(get)]
    pub confirmation_arbiter_composing: String,
    #[pyo3(get)]
    pub revocable_confirmation_arbiter: String,
    #[pyo3(get)]
    pub revocable_confirmation_arbiter_composing: String,
    #[pyo3(get)]
    pub unrevocable_confirmation_arbiter: String,
}

impl From<&alkahest_rs::clients::arbiters::ArbitersAddresses> for PyArbitersAddresses {
    fn from(data: &alkahest_rs::clients::arbiters::ArbitersAddresses) -> Self {
        Self {
            eas: format!("{:?}", data.eas),
            trusted_party_arbiter: format!("{:?}", data.trusted_party_arbiter),
            trivial_arbiter: format!("{:?}", data.trivial_arbiter),
            specific_attestation_arbiter: format!("{:?}", data.specific_attestation_arbiter),
            trusted_oracle_arbiter: format!("{:?}", data.trusted_oracle_arbiter),
            intrinsics_arbiter: format!("{:?}", data.intrinsics_arbiter),
            intrinsics_arbiter_2: format!("{:?}", data.intrinsics_arbiter_2),
            any_arbiter: format!("{:?}", data.any_arbiter),
            all_arbiter: format!("{:?}", data.all_arbiter),
            uid_arbiter: format!("{:?}", data.uid_arbiter),
            recipient_arbiter: format!("{:?}", data.recipient_arbiter),
            not_arbiter: format!("{:?}", data.not_arbiter),
            attester_arbiter_composing: format!("{:?}", data.attester_arbiter_composing),
            attester_arbiter_non_composing: format!("{:?}", data.attester_arbiter_non_composing),
            expiration_time_after_arbiter_composing: format!("{:?}", data.expiration_time_after_arbiter_composing),
            expiration_time_before_arbiter_composing: format!("{:?}", data.expiration_time_before_arbiter_composing),
            expiration_time_equal_arbiter_composing: format!("{:?}", data.expiration_time_equal_arbiter_composing),
            recipient_arbiter_composing: format!("{:?}", data.recipient_arbiter_composing),
            ref_uid_arbiter_composing: format!("{:?}", data.ref_uid_arbiter_composing),
            revocable_arbiter_composing: format!("{:?}", data.revocable_arbiter_composing),
            schema_arbiter_composing: format!("{:?}", data.schema_arbiter_composing),
            time_after_arbiter_composing: format!("{:?}", data.time_after_arbiter_composing),
            time_before_arbiter_composing: format!("{:?}", data.time_before_arbiter_composing),
            time_equal_arbiter_composing: format!("{:?}", data.time_equal_arbiter_composing),
            uid_arbiter_composing: format!("{:?}", data.uid_arbiter_composing),
            erc20_payment_fulfillment_arbiter: format!("{:?}", data.erc20_payment_fulfillment_arbiter),
            erc721_payment_fulfillment_arbiter: format!("{:?}", data.erc721_payment_fulfillment_arbiter),
            erc1155_payment_fulfillment_arbiter: format!("{:?}", data.erc1155_payment_fulfillment_arbiter),
            token_bundle_payment_fulfillment_arbiter: format!("{:?}", data.token_bundle_payment_fulfillment_arbiter),
            expiration_time_after_arbiter_non_composing: format!("{:?}", data.expiration_time_after_arbiter_non_composing),
            expiration_time_before_arbiter_non_composing: format!("{:?}", data.expiration_time_before_arbiter_non_composing),
            expiration_time_equal_arbiter_non_composing: format!("{:?}", data.expiration_time_equal_arbiter_non_composing),
            recipient_arbiter_non_composing: format!("{:?}", data.recipient_arbiter_non_composing),
            ref_uid_arbiter_non_composing: format!("{:?}", data.ref_uid_arbiter_non_composing),
            revocable_arbiter_non_composing: format!("{:?}", data.revocable_arbiter_non_composing),
            schema_arbiter_non_composing: format!("{:?}", data.schema_arbiter_non_composing),
            time_after_arbiter_non_composing: format!("{:?}", data.time_after_arbiter_non_composing),
            time_before_arbiter_non_composing: format!("{:?}", data.time_before_arbiter_non_composing),
            time_equal_arbiter_non_composing: format!("{:?}", data.time_equal_arbiter_non_composing),
            uid_arbiter_non_composing: format!("{:?}", data.uid_arbiter_non_composing),
            confirmation_arbiter: format!("{:?}", data.confirmation_arbiter),
            confirmation_arbiter_composing: format!("{:?}", data.confirmation_arbiter_composing),
            revocable_confirmation_arbiter: format!("{:?}", data.revocable_confirmation_arbiter),
            revocable_confirmation_arbiter_composing: format!("{:?}", data.revocable_confirmation_arbiter_composing),
            unrevocable_confirmation_arbiter: format!("{:?}", data.unrevocable_confirmation_arbiter),
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
