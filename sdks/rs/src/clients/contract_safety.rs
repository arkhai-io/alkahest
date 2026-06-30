use alloy::primitives::Address;

pub(crate) fn ensure_deployed_contract(address: Address, label: &str) -> eyre::Result<()> {
    if address == Address::ZERO {
        eyre::bail!("{label} is not deployed for this chain");
    }
    Ok(())
}
