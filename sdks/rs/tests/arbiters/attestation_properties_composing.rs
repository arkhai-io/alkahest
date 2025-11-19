use alkahest_rs::{
    clients::arbiters::DecodedDemand,
    contracts::attestation_properties::composing::{
        AttesterArbiter, ExpirationTimeAfterArbiter, ExpirationTimeBeforeArbiter,
        ExpirationTimeEqualArbiter, RecipientArbiter, RefUidArbiter, RevocableArbiter,
        SchemaArbiter, TimeAfterArbiter, TimeBeforeArbiter, TimeEqualArbiter, UidArbiter,
    },
    extensions::HasArbiters,
    utils::setup_test_environment,
};
use alloy::primitives::{Address, Bytes, FixedBytes};

#[tokio::test]
async fn test_attester_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let attester = Address::from_slice(&[1u8; 20]);
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = AttesterArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        attester,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_attester_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.attester, attester);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ AttesterArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_recipient_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let recipient = Address::from_slice(&[2u8; 20]);
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = RecipientArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        recipient,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_recipient_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.recipient, recipient);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ RecipientArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_schema_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let schema = FixedBytes::<32>::from_slice(&[3u8; 32]);
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = SchemaArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        schema,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_schema_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.schema, schema);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ SchemaArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_uid_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let uid = FixedBytes::<32>::from_slice(&[4u8; 32]);
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = UidArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        uid,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_uid_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.uid, uid);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ UidArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_ref_uid_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let ref_uid = FixedBytes::<32>::from_slice(&[5u8; 32]);
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = RefUidArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        refUID: ref_uid,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_ref_uid_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.ref_uid, ref_uid);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ RefUidArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_revocable_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let revocable = true;
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = RevocableArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        revocable,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_revocable_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.revocable, revocable);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ RevocableArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_time_after_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let time = 1640995200u64; // January 1, 2022 00:00:00 UTC
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = TimeAfterArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        time,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_time_after_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.time, time);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ TimeAfterArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_time_before_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let time = 1640995200u64; // January 1, 2022 00:00:00 UTC
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = TimeBeforeArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        time,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_time_before_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.time, time);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ TimeBeforeArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_time_equal_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let time = 1640995200u64; // January 1, 2022 00:00:00 UTC
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = TimeEqualArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        time,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_time_equal_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.time, time);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ TimeEqualArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_expiration_time_after_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let expiration_time = 1640995200u64; // January 1, 2022 00:00:00 UTC
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = ExpirationTimeAfterArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        expirationTime: expiration_time,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_expiration_time_after_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.expiration_time, expiration_time);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ ExpirationTimeAfterArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_expiration_time_before_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let expiration_time = 1640995200u64; // January 1, 2022 00:00:00 UTC
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = ExpirationTimeBeforeArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        expirationTime: expiration_time,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_expiration_time_before_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.expiration_time, expiration_time);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ ExpirationTimeBeforeArbiter composing decode test passed");
    Ok(())
}

#[tokio::test]
async fn test_expiration_time_equal_arbiter_composing_decode() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let expiration_time = 1640995200u64; // January 1, 2022 00:00:00 UTC
    let base_arbiter = test.addresses.arbiters_addresses.trivial_arbiter;
    let base_demand = Bytes::new();

    // Create demand data
    let demand_data = ExpirationTimeEqualArbiter::DemandData {
        baseArbiter: base_arbiter,
        baseDemand: base_demand.clone(),
        expirationTime: expiration_time,
    };

    // Test decode function
    let decoded = test
        .alice_client
        .arbiters()
        .decode_expiration_time_equal_arbiter_composing_demands(demand_data.clone())?;

    assert_eq!(decoded.base_arbiter, base_arbiter);
    assert_eq!(decoded.expiration_time, expiration_time);
    match decoded.base_demand.as_ref() {
        DecodedDemand::TrivialArbiter => {}
        _ => panic!("Expected TrivialArbiter"),
    }

    println!("✅ ExpirationTimeEqualArbiter composing decode test passed");
    Ok(())
}

/// Integration test to verify centralized decode functionality works for composing arbiters
#[tokio::test]
async fn test_centralized_decode_composing_arbiters() -> eyre::Result<()> {
    let test = setup_test_environment().await?;
    let addresses = &test.addresses.arbiters_addresses;

    // Test AttesterArbiter through centralized decode
    let attester = Address::from_slice(&[10u8; 20]);
    let demand_data = AttesterArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        attester,
    };
    let demand_bytes: Bytes = demand_data.clone().into();

    let decoded = test
        .alice_client
        .arbiters()
        .decode_arbiter_demand(addresses.attester_arbiter_composing, &demand_bytes)?;

    match decoded {
        DecodedDemand::AttesterArbiterComposing(decoded_data) => {
            assert_eq!(decoded_data.attester, attester);
            println!("✅ Centralized AttesterArbiter decode works");
        }
        _ => panic!("Expected AttesterArbiterComposing variant"),
    }

    // Test SchemaArbiter through centralized decode
    let schema = FixedBytes::<32>::from_slice(&[11u8; 32]);
    let demand_data = SchemaArbiter::DemandData {
        baseArbiter: addresses.trivial_arbiter,
        baseDemand: Bytes::new(),
        schema,
    };
    let demand_bytes: Bytes = demand_data.clone().into();

    let decoded = test
        .alice_client
        .arbiters()
        .decode_arbiter_demand(addresses.schema_arbiter_composing, &demand_bytes)?;

    match decoded {
        DecodedDemand::SchemaArbiterComposing(decoded_data) => {
            assert_eq!(decoded_data.schema, schema);
            println!("✅ Centralized SchemaArbiter decode works");
        }
        _ => panic!("Expected SchemaArbiterComposing variant"),
    }

    println!("✅ All centralized composing arbiter decode tests passed");
    Ok(())
}
