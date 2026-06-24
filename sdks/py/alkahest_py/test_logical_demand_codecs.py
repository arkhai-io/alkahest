from alkahest_py import (
    AllArbiter,
    AllArbiterDemandData,
    AnyArbiterDemandData,
    DefaultExtensionConfig,
    RecipientArbiterDemandData,
    create_decoders_from_addresses,
    decode_demand_tree,
)


def test_logical_demand_data_round_trip():
    cfg = DefaultExtensionConfig.for_chain("base_sepolia")
    recipient_arbiter = cfg.arbiters_addresses.recipient_arbiter
    recipient_demand = RecipientArbiterDemandData(
        "0x0000000000000000000000000000000000000001"
    ).encode_self()

    encoded = AllArbiterDemandData(
        [recipient_arbiter],
        [recipient_demand],
    ).encode_self()

    assert encoded == AllArbiter.encode([recipient_arbiter], [recipient_demand])
    decoded = AllArbiterDemandData.decode(encoded)
    assert decoded.arbiters == [recipient_arbiter]
    assert [bytes(demand) for demand in decoded.demands] == [bytes(recipient_demand)]


def test_decode_demand_tree_supports_extension_decoders():
    cfg = DefaultExtensionConfig.for_chain("base_sepolia")
    custom_arbiter = "0x" + "99" * 20
    custom_demand = b"extension-data"
    encoded = AnyArbiterDemandData([custom_arbiter], [custom_demand]).encode_self()

    decoders = create_decoders_from_addresses(
        cfg,
        extra_decoders={
            custom_arbiter: lambda demand: {
                "kind": "extension",
                "payload": bytes(demand),
            },
        },
    )

    tree = decode_demand_tree(cfg.arbiters_addresses.any_arbiter, encoded, decoders)

    assert tree["children"][0]["decoded"] == {
        "kind": "extension",
        "payload": custom_demand,
    }
