// use alkahest_rs::{
//     DefaultAlkahestClient,
//     clients::{
//         arbiters::{ArbitersModule, TrustedPartyArbiter},
//         erc20::Erc20Module,
//     },
//     extensions::{HasArbiters, HasAttestation, HasErc20},
//     fixtures::MockERC20Permit,
//     types::{ApprovalPurpose, ArbiterData, Erc20Data},
//     utils::setup_test_environment,
// };

// use alloy::{primitives::FixedBytes, sol, sol_types::SolValue};
// use eyre::Result;

// #[tokio::test]
// async fn test_trade_erc20_for_erc20() -> Result<()> {
//     // test setup
//     let test = setup_test_environment().await?;

//     // give alice some erc20_a tokens for bidding
//     let mock_erc20_a = MockERC20Permit::new(test.mock_addresses.erc20_a, &test.god_provider);
//     mock_erc20_a
//         .transfer(test.alice.address(), 10.try_into()?)
//         .send()
//         .await?
//         .get_receipt()
//         .await?;

//     // give bob some erc20_b tokens for fulfillment
//     let mock_erc20_b = MockERC20Permit::new(test.mock_addresses.erc20_b, &test.god_provider);
//     mock_erc20_b
//         .transfer(test.bob.address(), 10.try_into()?)
//         .send()
//         .await?
//         .get_receipt()
//         .await?;

//     let bid = Erc20Data {
//         address: test.mock_addresses.erc20_a,
//         value: 10.try_into()?,
//     };
//     let ask = Erc20Data {
//         address: test.mock_addresses.erc20_b,
//         value: 10.try_into()?,
//     };

//     test.alice_client
//         .erc20()
//         .approve(&bid, ApprovalPurpose::Escrow)
//         .await?;

//     // buy 10 erc20_b for 10 erc20_a
//     let receipt = test
//         .alice_client
//         .erc20()
//         .buy_erc20_for_erc20(&bid, &ask, 0)
//         .await?;

//     let attested = DefaultAlkahestClient::get_attested_event(receipt)?;
//     println!("{:?}", attested);

//     test.bob_client
//         .erc20()
//         .approve(&ask, ApprovalPurpose::Payment)
//         .await?;

//     let receipt = test
//         .bob_client
//         .erc20()
//         .pay_erc20_for_erc20(attested.uid)
//         .await?;
//     println!("{:?}", receipt);

//     Ok(())
// }

// #[tokio::test]
// async fn test_trade_erc20_for_custom() -> Result<()> {
//     let test_context = setup_test_environment().await?;
//     let rpc_url = test_context.anvil.ws_endpoint();

//     // Create clients using test environment
//     let client_buyer = DefaultAlkahestClient::with_base_extensions(
//         test_context.alice.clone(),
//         &rpc_url,
//         Some(test_context.addresses.clone()),
//     )
//     .await?;

//     let client_seller = DefaultAlkahestClient::with_base_extensions(
//         test_context.bob.clone(),
//         &rpc_url,
//         Some(test_context.addresses.clone()),
//     )
//     .await?;

//     // the example will use JobResultObligation to demand a string to be capitalized
//     // but JobResultObligation is generic enough to represent much more (a db query, a Dockerfile...)
//     // see https://github.com/CoopHive/alkahest-mocks/blob/main/src/Statements/JobResultObligation.sol
//     //
//     // for custom cases, you'll have to implement your own arbiter
//     //
//     // in the example, we'll use TrustedPartyArbiter and TrivialArbiter
//     // to make sure the result is from a particular trusted party,
//     // without actually validating the result
//     // see https://github.com/CoopHive/alkahest-mocks/blob/main/src/Validators/TrustedPartyArbiter.sol
//     // and https://github.com/CoopHive/alkahest-mocks/blob/main/src/Validators/TrivialArbiter.sol

//     // construct custom demand. note that this could be anything, and is determined by the arbiter.
//     // since our base arbiter is TrivialArbiter, which doesn't actually decode DemandData,
//     // the format doesn't matter. though the seller and buyer do still have to agree on it
//     // so that the seller can properly fulfill the demand.
//     sol! {
//         struct ResultDemandData {
//             string query;
//         }
//     }
//     let base_demand = ResultDemandData {
//         query: "hello world".to_string(),
//     }
//     .abi_encode();

//     // we use TrustedPartyArbiter to wrap the base demand. This actually does decode DemandData,
//     // and we use the DemandData format it defines,
//     // to demand that only our trusted seller can fulfill the demand.
//     // if the baseDemand were something other than TrivialArbiter,
//     // it would be an additional check on the fulfillment.
//     // many arbiters can be stacked according to this pattern.
//     // if using a custom Arbiter not supported by the SDK, you can use the sol! macro and abi_encode
//     // directly, like we did for the base_demand

//     let demand =
//         ArbitersModule::encode_trusted_party_arbiter_demand(&TrustedPartyArbiter::DemandData {
//             creator: client_seller.address,
//             baseArbiter: client_seller.arbiters().addresses.trivial_arbiter,
//             baseDemand: base_demand.into(),
//         });

//     // approve escrow contract to spend tokens
//     // Use mock ERC20 token from test environment instead of real USDC
//     let bid = Erc20Data {
//         address: test_context.mock_addresses.erc20_a,
//         value: 10.try_into()?,
//     };
//     let ask = ArbiterData {
//         arbiter: client_seller.arbiters().addresses.trusted_party_arbiter,
//         demand,
//     };

//     client_buyer
//         .erc20()
//         .approve(&bid, ApprovalPurpose::Escrow)
//         .await?;

//     // make escrow with generic escrow function,
//     // passing in TrustedPartyArbiter's address and our custom demand,
//     // and no expiration
//     let escrow = client_buyer.erc20().buy_with_erc20(&bid, &ask, 0).await?;
//     let escrow = DefaultAlkahestClient::get_attested_event(escrow)?;
//     println!("escrow: {escrow:?}");

//     // now the seller manually decodes the obligation and demand
//     // and creates a StringResultObligation
//     // and manually collects payment
//     let buy_obligation = client_seller
//         .attestation()
//         .get_attestation(escrow.uid)
//         .await?;
//     let buy_obligation = Erc20Module::decode_escrow_obligation(&buy_obligation.data)?;

//     let decoded_demand =
//         ArbitersModule::decode_trusted_party_arbiter_demand(&buy_obligation.demand)?;
//     let decoded_base_demand = ResultDemandData::abi_decode(decoded_demand.baseDemand.as_ref());

//     // uppercase string for the example;
//     // this could be anything as agreed upon between buyer and seller
//     // (running a Docker job, executing a DB query...)
//     // as long as the job "spec" is agreed upon between buyer and seller,
//     // and the "query" is contained in the demand
//     let result = decoded_base_demand?.query.to_uppercase();
//     println!("result: {}", result);

//     // manually make result obligation
//     // In test environment, we'll use the StringObligation contract that's already deployed
//     // instead of trying to use a specific JobResultObligation address
//     let string_obligation_addr = test_context
//         .addresses
//         .string_obligation_addresses
//         .obligation;

//     sol!(
//         #[allow(missing_docs)]
//         #[sol(rpc)]
//         #[derive(Debug)]
//         StringObligation,
//         "src/contracts/StringObligation.json"
//     );

//     let string_obligation =
//         StringObligation::new(string_obligation_addr, &client_seller.wallet_provider);

//     let result = string_obligation
//         .doObligation(
//             StringObligation::ObligationData {
//                 item: result.to_string(),
//             },
//             FixedBytes::<32>::ZERO,
//         )
//         .send()
//         .await?
//         .get_receipt()
//         .await?;
//     let result = DefaultAlkahestClient::get_attested_event(result)?;
//     println!("result: {result:?}");

//     // and collect the payment from escrow
//     let collection = client_seller
//         .erc20()
//         .collect_escrow(escrow.uid, result.uid)
//         .await?;
//     println!("collection: {collection:?}");

//     // meanwhile, the buyer can wait for fulfillment of her escrow.
//     // if called after fulfillment, like in this case, it will
//     // return the fulfilling obligation immediately
//     let fulfillment = client_buyer
//         .wait_for_fulfillment(
//             client_buyer.erc20().addresses.escrow_obligation,
//             escrow.uid,
//             None,
//         )
//         .await?;

//     // and extract the result from the fulfillment obligation
//     let fulfillment = client_buyer
//         .attestation()
//         .get_attestation(fulfillment.fulfillment)
//         .await?;

//     let result = StringObligation::ObligationData::abi_decode(fulfillment.data.as_ref());
//     println!("result: {}", result?.item);

//     Ok(())
// }
