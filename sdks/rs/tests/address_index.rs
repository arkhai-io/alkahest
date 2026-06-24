use alkahest_rs::addresses::BASE_SEPOLIA_ADDRESSES;

#[test]
fn lookup_address_returns_all_matching_slots() {
    let matches =
        BASE_SEPOLIA_ADDRESSES.lookup_address(BASE_SEPOLIA_ADDRESSES.arbiters_addresses.eas);

    assert!(matches.len() > 1);
    assert!(
        matches
            .iter()
            .any(|info| info.section == "arbiters_addresses" && info.field == "eas")
    );
    assert!(
        matches
            .iter()
            .any(|info| info.section == "erc20_addresses" && info.field == "eas")
    );
}

#[test]
fn lookup_address_includes_escrow_kind_for_escrow_obligations() {
    let matches = BASE_SEPOLIA_ADDRESSES.lookup_address(
        BASE_SEPOLIA_ADDRESSES
            .erc20_addresses
            .escrow_obligation_default,
    );

    assert_eq!(
        matches
            .iter()
            .find(|info| info.section == "erc20_addresses")
            .and_then(|info| info.escrow_kind.as_deref()),
        Some("erc20_escrow_obligation_default")
    );
}
