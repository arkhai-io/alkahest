use alkahest_rs::contracts;
use alloy::primitives::{Address, Bytes, FixedBytes};
use std::time::{SystemTime, UNIX_EPOCH};

pub(crate) fn create_test_attestation(
    uid: Option<FixedBytes<32>>,
    recipient: Option<Address>,
) -> contracts::IEAS::Attestation {
    contracts::IEAS::Attestation {
        uid: uid.unwrap_or_default(),
        schema: FixedBytes::<32>::default(),
        time: SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs()
            .into(),
        expirationTime: 0u64.into(),
        revocationTime: 0u64.into(),
        refUID: FixedBytes::<32>::default(),
        recipient: recipient.unwrap_or_default(),
        attester: Address::default(),
        revocable: true,
        data: Bytes::default(),
    }
}
