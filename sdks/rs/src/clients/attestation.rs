use alloy::primitives::Address;
use alloy::primitives::{Bytes, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::signers::local::PrivateKeySigner;
use alloy::sol_types::SolValue as _;
use serde::{Deserialize, Serialize};

use crate::addresses::BASE_SEPOLIA_ADDRESSES;
use crate::contracts::IEAS::Attestation;
use crate::contracts::{self, IEAS};
use crate::extensions::{AlkahestExtension, ContractModule};
use crate::types::WalletProvider;
use crate::types::{ArbiterData, DecodedAttestation};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AttestationAddresses {
    pub eas: Address,
    pub eas_schema_registry: Address,
    pub barter_utils: Address,
    pub escrow_obligation: Address,
    pub escrow_obligation_2: Address,
}

#[derive(Clone)]
pub struct AttestationModule {
    _signer: PrivateKeySigner,
    wallet_provider: WalletProvider,

    pub addresses: AttestationAddresses,
}

impl Default for AttestationAddresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.attestation_addresses
    }
}

/// Available contracts in the Attestation module
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AttestationContract {
    /// EAS (Ethereum Attestation Service) contract
    Eas,
    /// EAS Schema Registry contract
    EasSchemaRegistry,
    /// Barter utilities contract for attestations
    BarterUtils,
    /// Escrow obligation contract for attestations
    EscrowObligation,
    /// Alternative escrow obligation contract for attestations
    EscrowObligation2,
}

impl ContractModule for AttestationModule {
    type Contract = AttestationContract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            AttestationContract::Eas => self.addresses.eas,
            AttestationContract::EasSchemaRegistry => self.addresses.eas_schema_registry,
            AttestationContract::BarterUtils => self.addresses.barter_utils,
            AttestationContract::EscrowObligation => self.addresses.escrow_obligation,
            AttestationContract::EscrowObligation2 => self.addresses.escrow_obligation_2,
        }
    }
}

impl AttestationModule {
    /// Creates a new AttestationModule instance.
    ///
    /// # Arguments
    /// * `private_key` - The private key for signing transactions
    /// * `rpc_url` - The RPC endpoint URL
    /// * `addresses` - Optional custom contract addresses
    pub fn new(
        signer: PrivateKeySigner,
        wallet_provider: WalletProvider,
        addresses: Option<AttestationAddresses>,
    ) -> eyre::Result<Self> {
        Ok(AttestationModule {
            _signer: signer,
            wallet_provider,
            addresses: addresses.unwrap_or_default(),
        })
    }

    /// Decodes AttestationEscrowObligation.ObligationData from bytes.
    ///
    /// # Arguments
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    /// * `Result<contracts::AttestationEscrowObligation::ObligationData>` - The decoded obligation data
    pub fn decode_escrow_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::AttestationEscrowObligation::ObligationData> {
        let obligation_data =
            contracts::AttestationEscrowObligation::ObligationData::abi_decode(obligation_data)?;
        return Ok(obligation_data);
    }

    /// Decodes AttestationEscrowObligation2.ObligationData from bytes.
    ///
    /// # Arguments
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    /// * `Result<contracts::AttestationEscrowObligation2::ObligationData>` - The decoded obligation data
    pub fn decode_escrow_obligation_2(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::AttestationEscrowObligation2::ObligationData> {
        let obligation_data =
            contracts::AttestationEscrowObligation2::ObligationData::abi_decode(obligation_data)?;
        return Ok(obligation_data);
    }

    pub async fn get_escrow_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::AttestationEscrowObligation::ObligationData>>
    {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::AttestationEscrowObligation::ObligationData::abi_decode(&attestation.data)?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    pub async fn get_escrow_obligation_2(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::AttestationEscrowObligation2::ObligationData>>
    {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::AttestationEscrowObligation2::ObligationData::abi_decode(&attestation.data)?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Retrieves an attestation by its UID.
    ///
    /// # Arguments
    /// * `uid` - The unique identifier of the attestation
    pub async fn get_attestation(&self, uid: FixedBytes<32>) -> eyre::Result<Attestation> {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        Ok(attestation)
    }

    /// Registers a new schema in the EAS Schema Registry.
    ///
    /// # Arguments
    /// * `schema` - The schema string defining the attestation structure
    /// * `resolver` - The address of the resolver contract
    /// * `revocable` - Whether attestations using this schema can be revoked
    pub async fn register_schema(
        &self,
        schema: String,
        resolver: Address,
        revocable: bool,
    ) -> eyre::Result<TransactionReceipt> {
        let schema_registry_contract = contracts::ISchemaRegistry::new(
            self.addresses.eas_schema_registry,
            &self.wallet_provider,
        );

        let receipt = schema_registry_contract
            .register(schema, resolver, revocable)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates a new attestation using the EAS contract.
    ///
    /// # Arguments
    /// * `attestation` - The attestation request data
    pub async fn attest(
        &self,
        attestation: IEAS::AttestationRequest,
    ) -> eyre::Result<TransactionReceipt> {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let receipt = eas_contract
            .attest(attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Collects payment from an attestation escrow by providing a fulfillment attestation.
    /// This function is used with the original AttestationEscrowObligation contract.
    ///
    /// # Arguments
    /// * `buy_attestation` - The UID of the escrow attestation
    /// * `fulfillment` - The UID of the fulfillment attestation
    pub async fn collect_escrow(
        &self,
        buy_attestation: FixedBytes<32>,
        fulfillment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract = contracts::AttestationEscrowObligation::new(
            self.addresses.escrow_obligation,
            &self.wallet_provider,
        );

        let receipt = escrow_contract
            .collectEscrow(buy_attestation, fulfillment)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Collects payment from an attestation escrow by providing a fulfillment attestation.
    /// This function is used with AttestationEscrowObligation2 and creates a validation
    /// attestation referencing the original attestation.
    ///
    /// # Arguments
    /// * `buy_attestation` - The UID of the escrow attestation
    /// * `fulfillment` - The UID of the fulfillment attestation
    pub async fn collect_escrow_2(
        &self,
        buy_attestation: FixedBytes<32>,
        fulfillment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract = contracts::AttestationEscrowObligation2::new(
            self.addresses.escrow_obligation_2,
            &self.wallet_provider,
        );

        let receipt = escrow_contract
            .collectEscrow(buy_attestation, fulfillment)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow using an attestation as the escrowed item.
    /// This function uses the original AttestationEscrowObligation contract where the full attestation
    /// data is stored in the escrow obligation. When collecting payment, this contract creates a new
    /// attestation as the collection event, requiring the contract to have attestation rights.
    ///
    /// # Arguments
    /// * `attestation` - The attestation data to be escrowed
    /// * `demand` - The arbiter and demand data for the escrow
    /// * `expiration` - Optional expiration time for the escrow (default: 0 = no expiration)
    pub async fn create_escrow(
        &self,
        attestation: IEAS::AttestationRequest,
        demand: ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let attestation_escrow_obligation_contract = contracts::AttestationEscrowObligation::new(
            self.addresses.escrow_obligation,
            &self.wallet_provider,
        );

        let receipt = attestation_escrow_obligation_contract
            .doObligation(
                contracts::AttestationEscrowObligation::ObligationData {
                    attestation: attestation.into(),
                    arbiter: demand.arbiter,
                    demand: demand.demand,
                },
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow using an attestation UID as reference.
    /// This function uses AttestationEscrowObligation2 which references the attestation by UID
    /// instead of storing the full attestation data, making it more gas efficient. When collecting
    /// payment, this contract creates a validation attestation that references the original attestation,
    /// allowing it to work with any schema implementation without requiring attestation rights.
    ///
    /// # Arguments
    /// * `attestation` - The UID of the attestation to be escrowed
    /// * `demand` - The arbiter and demand data for the escrow
    /// * `expiration` - Optional expiration time for the escrow (default: 0 = no expiration)
    pub async fn create_escrow_2(
        &self,
        attestation: FixedBytes<32>,
        demand: ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let attestation_escrow_obligation_2_contract = contracts::AttestationEscrowObligation2::new(
            self.addresses.escrow_obligation_2,
            &self.wallet_provider,
        );

        let receipt = attestation_escrow_obligation_2_contract
            .doObligation(
                contracts::AttestationEscrowObligation2::ObligationData {
                    attestationUid: attestation,
                    arbiter: demand.arbiter,
                    demand: demand.demand,
                },
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an attestation and immediately escrows it in a single transaction.
    /// This is a convenience function that combines createAttestation and createEscrow.
    ///
    /// # Arguments
    /// * `attestation` - The attestation data to create and escrow
    /// * `demand` - The escrow parameters including arbiter and demand
    /// * `expiration` - Optional expiration time for the escrow
    pub async fn attest_and_create_escrow(
        &self,
        attestation: IEAS::AttestationRequest,
        demand: ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::AttestationBarterUtils::new(
            self.addresses.barter_utils,
            &self.wallet_provider,
        );

        let receipt = barter_utils_contract
            .attestAndCreateEscrow(
                attestation.into(),
                demand.arbiter,
                demand.demand,
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}

impl AlkahestExtension for AttestationModule {
    type Config = AttestationAddresses;
    async fn init(
        signer: PrivateKeySigner,
        providers: crate::types::ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(signer, (*providers.wallet).clone(), config)
    }
}

#[cfg(test)]
mod tests {
    use alloy::{
        primitives::{Address, Bytes, FixedBytes, U256},
        rpc::types::TransactionReceipt,
        sol,
        sol_types::{SolEvent as _, SolValue as _},
    };
    use std::time::{SystemTime, UNIX_EPOCH};

    use super::AttestationModule;
    use crate::{DefaultAlkahestClient, contracts::StringObligation};
    use crate::{
        contracts::{self, IEAS},
        extensions::{HasAttestation, HasStringObligation},
        types::ArbiterData,
        utils::{TestContext, setup_test_environment},
    };

    // Helper function to register a schema for testing
    async fn register_test_schema(
        test: &TestContext,
        schema: String,
    ) -> eyre::Result<FixedBytes<32>> {
        let schema_registry = contracts::ISchemaRegistry::new(
            test.addresses
                .clone()
                .attestation_addresses
                .eas_schema_registry,
            test.alice_client.wallet_provider.clone(),
        );

        // Register schema
        let receipt = schema_registry
            .register(
                schema,
                test.addresses.clone().attestation_addresses.barter_utils,
                true,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        // Extract schema ID from logs
        let schema_id = receipt
            .logs()
            .first()
            .ok_or(eyre::eyre!("No logs found in schema registration receipt"))?
            .topics()
            .get(1)
            .ok_or(eyre::eyre!("No schema ID in log topics"))?
            .clone();

        Ok(schema_id)
    }

    // Helper to create an attestation
    async fn create_attestation(
        test: &TestContext,
        schema_id: FixedBytes<32>,
        recipient: Address,
        data: Bytes,
    ) -> eyre::Result<(TransactionReceipt, FixedBytes<32>)> {
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400; // 1 day

        // Create attestation request
        let attestation_request = IEAS::AttestationRequest {
            schema: schema_id,
            data: IEAS::AttestationRequestData {
                recipient,
                expirationTime: expiration.into(),
                revocable: true,
                refUID: FixedBytes::<32>::default(),
                data,
                value: U256::ZERO,
            },
        };

        // Attest
        let eas_contract = contracts::IEAS::new(
            test.addresses.clone().attestation_addresses.eas,
            &test.alice_client.wallet_provider,
        );

        let receipt = eas_contract
            .attest(attestation_request.clone())
            .send()
            .await?
            .get_receipt()
            .await?;

        // Extract attestation UID from receipt
        let uid = DefaultAlkahestClient::get_attested_event(receipt.clone())?.uid;

        Ok((receipt, uid))
    }

    #[tokio::test]
    async fn test_decode_escrow_obligation() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Create sample obligation data
        let attestation_request = IEAS::AttestationRequest {
            schema: FixedBytes::<32>::default(),
            data: IEAS::AttestationRequestData {
                recipient: test.bob.address(),
                expirationTime: 123456789,
                revocable: true,
                refUID: FixedBytes::<32>::default(),
                data: Bytes::from(vec![1, 2, 3]),
                value: U256::ZERO,
            },
        };

        let arbiter = test.addresses.attestation_addresses.barter_utils;
        let demand = Bytes::from(vec![4, 5, 6]);

        let escrow_data = contracts::AttestationEscrowObligation::ObligationData {
            attestation: attestation_request.clone().into(),
            arbiter,
            demand: demand.clone(),
        };

        // Encode the data
        let encoded = escrow_data.abi_encode();

        // Decode the data
        let decoded = AttestationModule::decode_escrow_obligation(&encoded.into())?;

        // Verify decoded data
        assert_eq!(decoded.arbiter, arbiter, "Arbiter should match");
        assert_eq!(decoded.demand, demand, "Demand should match");
        assert_eq!(
            decoded.attestation.schema, attestation_request.schema,
            "Schema should match"
        );
        assert_eq!(
            decoded.attestation.data.recipient, attestation_request.data.recipient,
            "Recipient should match"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_decode_escrow_obligation_2() -> eyre::Result<()> {
        // Test setup
        let test = setup_test_environment().await?;

        // Create sample obligation data
        let attestation_uid = FixedBytes::<32>::from_slice(&[1u8; 32]);
        let arbiter = test.addresses.attestation_addresses.barter_utils;
        let demand = Bytes::from(vec![4, 5, 6]);

        let escrow_data = contracts::AttestationEscrowObligation2::ObligationData {
            attestationUid: attestation_uid,
            arbiter,
            demand: demand.clone(),
        };

        // Encode the data
        let encoded = escrow_data.abi_encode();

        // Decode the data
        let decoded = AttestationModule::decode_escrow_obligation_2(&encoded.into())?;

        // Verify decoded data
        assert_eq!(
            decoded.attestationUid, attestation_uid,
            "Attestation UID should match"
        );
        assert_eq!(decoded.arbiter, arbiter, "Arbiter should match");
        assert_eq!(decoded.demand, demand, "Demand should match");

        Ok(())
    }

    #[tokio::test]
    async fn test_get_attestation() -> eyre::Result<()> {
        // Setup test environment
        let test = setup_test_environment().await?;

        // Register a schema
        let schema_id = register_test_schema(
            &test,
            format!(
                "string testData{}",
                SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs()
            ),
        )
        .await?;

        // Create an attestation
        let (_, attestation_uid) = create_attestation(
            &test,
            schema_id,
            test.bob.address(),
            Bytes::from("test attestation data".as_bytes()),
        )
        .await?;

        // Get attestation using the client method
        let attestation = test
            .alice_client
            .attestation()
            .get_attestation(attestation_uid)
            .await?;

        // Verify attestation data
        assert_eq!(attestation.uid, attestation_uid, "UID should match");
        assert_eq!(attestation.schema, schema_id, "Schema should match");
        assert_eq!(
            attestation.recipient,
            test.bob.address(),
            "Recipient should match"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_register_schema() -> eyre::Result<()> {
        // Setup test environment
        let test = setup_test_environment().await?;

        // Generate a unique schema name
        let schema = format!(
            "uint256 value{}",
            SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs()
        );

        // Register schema using the client
        let receipt = test
            .alice_client
            .attestation()
            .register_schema(
                schema.clone(),
                test.addresses.attestation_addresses.barter_utils,
                true,
            )
            .await?;

        // Extract schema ID
        let schema_id = receipt
            .logs()
            .first()
            .ok_or(eyre::eyre!("No logs found in schema registration receipt"))?
            .topics()
            .get(1)
            .ok_or(eyre::eyre!("No schema ID in log topics"))?
            .clone();

        // Verify schema ID is not empty
        assert_ne!(
            schema_id,
            FixedBytes::<32>::default(),
            "Schema ID should not be empty"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_attest() -> eyre::Result<()> {
        // Setup test environment
        let test = setup_test_environment().await?;

        sol! {
            struct TestStruct {
                bool value;
            }
        }

        // Register a schema
        let schema_id = register_test_schema(
            &test,
            format!(
                "bool value{}",
                SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs()
            ),
        )
        .await?;

        // Create attestation request
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400; // 1 day
        let attestation_request = IEAS::AttestationRequest {
            schema: schema_id,
            data: IEAS::AttestationRequestData {
                recipient: test.bob.address(),
                expirationTime: expiration.into(),
                revocable: true,
                refUID: FixedBytes::<32>::default(),
                data: TestStruct { value: true }.abi_encode().into(),
                value: U256::ZERO,
            },
        };

        // Attest using the client
        let receipt = test
            .alice_client
            .attestation()
            .attest(attestation_request)
            .await?;

        // Extract attestation UID
        let attested_event = DefaultAlkahestClient::get_attested_event(receipt)?;

        // Verify attestation was created
        assert_ne!(
            attested_event.uid,
            FixedBytes::<32>::default(),
            "Attestation UID should not be empty",
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_create_escrow() -> eyre::Result<()> {
        // Setup test environment
        let test = setup_test_environment().await?;

        sol! {
            struct TestStruct {
                string value;
            }
        }

        // Register a schema
        let schema_id = register_test_schema(
            &test,
            format!(
                "string testData{}",
                SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs()
            ),
        )
        .await?;

        // Create attestation request
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400; // 1 day
        let attestation_request = IEAS::AttestationRequest {
            schema: schema_id,
            data: IEAS::AttestationRequestData {
                recipient: test.bob.address(),
                expirationTime: expiration.into(),
                revocable: true,
                refUID: FixedBytes::<32>::default(),
                data: TestStruct {
                    value: "test attestation data".to_string(),
                }
                .abi_encode()
                .into(),
                value: U256::ZERO,
            },
        };

        // Create demand data
        let arbiter = test.addresses.attestation_addresses.barter_utils;

        let demand = TestStruct {
            value: "test demand".to_string(),
        }
        .abi_encode()
        .into();

        let demand_data = ArbiterData { arbiter, demand };

        // Create escrow expiration
        let escrow_expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 2 * 86400; // 2 days

        // Create escrow using the client
        let receipt = test
            .alice_client
            .attestation()
            .create_escrow(attestation_request, demand_data, escrow_expiration)
            .await?;

        // Extract escrow attestation UID
        let escrow_event = DefaultAlkahestClient::get_attested_event(receipt)?;

        // Verify escrow was created
        assert_ne!(
            escrow_event.uid,
            FixedBytes::<32>::default(),
            "Escrow UID should not be empty"
        );

        // Get the attestation to verify details
        let escrow_attestation = test
            .alice_client
            .attestation()
            .get_attestation(escrow_event.uid)
            .await?;

        // Verify escrow attestation details
        assert_eq!(
            escrow_attestation.recipient,
            test.alice.address(),
            "Escrow recipient should be Alice (the creator)"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_create_escrow_2() -> eyre::Result<()> {
        // Setup test environment
        let test = setup_test_environment().await?;

        sol! {
            struct TestStruct {
                string value;
            }
        }

        // Register a schema
        let schema_id = register_test_schema(
            &test,
            format!(
                "string testData{}",
                SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs()
            ),
        )
        .await?;

        // Create a pre-existing attestation
        let (_, attestation_uid) = create_attestation(
            &test,
            schema_id,
            test.bob.address(),
            TestStruct {
                value: "pre-existing attestation data".to_string(),
            }
            .abi_encode()
            .into(),
        )
        .await?;

        // Create demand data
        let arbiter = test.addresses.arbiters_addresses.trivial_arbiter;

        let demand = TestStruct {
            value: "test demand".to_string(),
        }
        .abi_encode()
        .into();

        let demand_data = ArbiterData { arbiter, demand };

        // Create escrow expiration
        let escrow_expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400; // 1 day

        // Create escrow using the client (version 2 - references attestation by UID)
        let receipt = test
            .alice_client
            .attestation()
            .create_escrow_2(attestation_uid, demand_data, escrow_expiration)
            .await?;

        // Extract escrow attestation UID
        let escrow_event = DefaultAlkahestClient::get_attested_event(receipt)?;

        // Verify escrow was created
        assert_ne!(
            escrow_event.uid,
            FixedBytes::<32>::default(),
            "Escrow UID should not be empty"
        );

        // Get the attestation to verify details
        let escrow_attestation = test
            .alice_client
            .attestation()
            .get_attestation(escrow_event.uid)
            .await?;

        // Get the expected schema ID from the contract
        let escrow_contract = contracts::AttestationEscrowObligation2::new(
            test.addresses.attestation_addresses.escrow_obligation_2,
            &test.god_provider,
        );

        let attestation_schema = escrow_contract.ATTESTATION_SCHEMA().call().await?;

        // Verify escrow attestation details
        assert_eq!(
            escrow_attestation.schema, attestation_schema,
            "Schema should match the contract's ATTESTATION_SCHEMA"
        );
        assert_eq!(
            escrow_attestation.recipient,
            test.alice.address(),
            "Escrow recipient should be Alice (the creator)"
        );

        // While we can't easily decode the attestation data in this test to verify the attestationUid field,
        // we've confirmed the escrow was created with the correct structure

        Ok(())
    }

    #[tokio::test]
    async fn test_collect_payment() -> eyre::Result<()> {
        // Setup test environment
        let test = setup_test_environment().await?;

        sol! {
            struct TestStruct {
                string value;
            }
        }

        // Register a schema
        let schema_id = register_test_schema(
            &test,
            format!(
                "string testData{}",
                SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs()
            ),
        )
        .await?;

        // Create attestation request for escrow
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400; // 1 day
        let attestation_request = IEAS::AttestationRequest {
            schema: schema_id,
            data: IEAS::AttestationRequestData {
                recipient: test.bob.address(),
                expirationTime: expiration.into(),
                revocable: true,
                refUID: FixedBytes::<32>::default(),
                data: TestStruct {
                    value: "test attestation data".to_string(),
                }
                .abi_encode()
                .into(),
                value: U256::ZERO,
            },
        };

        // Create demand data with trivial arbiter (which approves all fulfillments)
        let arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
        let demand = TestStruct {
            value: "test demand".to_string(),
        }
        .abi_encode()
        .into();

        let demand_data = ArbiterData { arbiter, demand };

        // Create escrow using the client
        let escrow_receipt = test
            .alice_client
            .attestation()
            .create_escrow(
                attestation_request,
                demand_data,
                0, // no expiration
            )
            .await?;

        // Extract escrow attestation UID
        let escrow_event = DefaultAlkahestClient::get_attested_event(escrow_receipt)?;
        let escrow_uid = escrow_event.uid;

        // Bob creates a fulfillment using StringObligation
        let fulfillment_receipt = test
            .bob_client
            .string_obligation()
            .do_obligation("fulfillment data".to_string(), None)
            .await?;

        let fulfillment_event = DefaultAlkahestClient::get_attested_event(fulfillment_receipt)?;
        let fulfillment_uid = fulfillment_event.uid;

        // Bob collects payment using the fulfillment
        let collection_receipt = test
            .bob_client
            .attestation()
            .collect_escrow(escrow_uid, fulfillment_uid)
            .await?;

        // Extract payment attestation UID
        let payment_event = DefaultAlkahestClient::get_attested_event(collection_receipt)?;
        let payment_uid = payment_event.uid;

        // Verify payment was collected
        assert_ne!(
            payment_uid,
            FixedBytes::<32>::default(),
            "Payment UID should not be empty"
        );

        // Verify escrow attestation was revoked
        let escrow_attestation = test
            .bob_client
            .attestation()
            .get_attestation(escrow_uid)
            .await?;
        assert_ne!(
            escrow_attestation.revocationTime, 0,
            "Escrow attestation should be revoked"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_collect_payment_2() -> eyre::Result<()> {
        // Setup test environment
        let test = setup_test_environment().await?;

        sol! {
            struct TestStruct {
                string value;
            }
        }

        // Register a schema
        let schema_id = register_test_schema(
            &test,
            format!(
                "string testData{}",
                SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs()
            ),
        )
        .await?;

        // Create a pre-existing attestation
        let (_, attestation_uid) = create_attestation(
            &test,
            schema_id,
            test.bob.address(),
            TestStruct {
                value: "pre-existing attestation data".to_string(),
            }
            .abi_encode()
            .into(),
        )
        .await?;

        // Create demand data
        let arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
        let demand = TestStruct {
            value: "test demand".to_string(),
        }
        .abi_encode()
        .into();
        let demand_data = ArbiterData { arbiter, demand };

        // Create escrow expiration
        let escrow_expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400; // 1 day

        // Create escrow using the client (version 2 - references attestation by UID)
        let escrow_receipt = test
            .alice_client
            .attestation()
            .create_escrow_2(attestation_uid, demand_data, escrow_expiration)
            .await?;

        // Extract escrow attestation UID
        let escrow_event = DefaultAlkahestClient::get_attested_event(escrow_receipt)?;
        let escrow_uid = escrow_event.uid;

        // Bob creates a fulfillment using StringObligation
        let string_obligation = StringObligation::new(
            test.addresses.string_obligation_addresses.obligation,
            &test.bob_client.wallet_provider,
        );

        let fulfillment_receipt = string_obligation
            .doObligation(
                contracts::StringObligation::ObligationData {
                    item: "fulfillment data".to_string(),
                },
                FixedBytes::<32>::default(),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        let fulfillment_event = DefaultAlkahestClient::get_attested_event(fulfillment_receipt)?;
        let fulfillment_uid = fulfillment_event.uid;

        // Bob collects payment using the fulfillment
        let collection_receipt = test
            .bob_client
            .attestation()
            .collect_escrow_2(escrow_uid, fulfillment_uid)
            .await?;

        // Extract validation attestation UID
        let validation_event = DefaultAlkahestClient::get_attested_event(collection_receipt)?;
        let validation_uid = validation_event.uid;

        // Verify validation was created
        assert_ne!(
            validation_uid,
            FixedBytes::<32>::default(),
            "Validation UID should not be empty"
        );

        // Get the validation attestation
        let validation_attestation = test
            .bob_client
            .attestation()
            .get_attestation(validation_uid)
            .await?;

        // Get the expected validation schema ID from the contract
        let escrow_contract = contracts::AttestationEscrowObligation2::new(
            test.addresses.attestation_addresses.escrow_obligation_2,
            &test.god_provider,
        );

        let validation_schema = escrow_contract.VALIDATION_SCHEMA().call().await?;

        // Verify validation attestation details
        assert_eq!(
            validation_attestation.schema, validation_schema,
            "Schema should match the contract's VALIDATION_SCHEMA"
        );
        assert_eq!(
            validation_attestation.recipient,
            test.bob.address(),
            "Validation recipient should be Bob (who collected payment)"
        );
        assert_eq!(
            validation_attestation.refUID, attestation_uid,
            "Reference UID should be the original attestation"
        );

        // Verify escrow attestation was revoked
        let escrow_attestation = test
            .bob_client
            .attestation()
            .get_attestation(escrow_uid)
            .await?;
        assert!(
            escrow_attestation.revocationTime > 0u64.into(),
            "Escrow attestation should be revoked"
        );

        Ok(())
    }

    #[tokio::test]
    async fn test_attest_and_create_escrow() -> eyre::Result<()> {
        // Setup test environment
        let test = setup_test_environment().await?;

        sol! {
            struct TestStruct {
                string value;
            }
        }

        // Register a schema
        let schema_id = register_test_schema(
            &test,
            format!(
                "string testData{}",
                SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs()
            ),
        )
        .await?;

        // Create attestation request
        let expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 86400; // 1 day
        let attestation_request = IEAS::AttestationRequest {
            schema: schema_id,
            data: IEAS::AttestationRequestData {
                recipient: test.bob.address(),
                expirationTime: expiration.into(),
                revocable: true,
                refUID: FixedBytes::<32>::default(),
                data: TestStruct {
                    value: "test attestation data".to_string(),
                }
                .abi_encode()
                .into(),
                value: U256::ZERO,
            },
        };

        // Create demand data
        let arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
        let demand = TestStruct {
            value: "test demand".to_string(),
        }
        .abi_encode()
        .into();
        let demand_data = ArbiterData { arbiter, demand };

        // Create escrow expiration
        let escrow_expiration = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs() + 2 * 86400; // 2 days

        // Attest and create escrow in one step
        let receipt = test
            .alice_client
            .attestation()
            .attest_and_create_escrow(attestation_request, demand_data, escrow_expiration)
            .await?;

        // This function creates two attestations - one for the attestation and one for the escrow

        let attested_events = receipt
            .inner
            .logs()
            .iter()
            .filter(|log| log.topic0() == Some(&contracts::IEAS::Attested::SIGNATURE_HASH))
            .map(|log| log.log_decode::<contracts::IEAS::Attested>())
            .collect::<Vec<_>>();

        assert_eq!(attested_events.len(), 2, "2 attestations should be created");

        Ok(())
    }
}
