from alkahest_py import (
    ERC1155PaymentObligationData,
    ERC20PaymentObligationData,
    ERC721PaymentObligationData,
    NativeTokenPaymentObligationData,
    TokenBundlePaymentObligationData,
)


def erc20_payment_demand(env, data, payee):
    return {
        "arbiter": env.addresses.erc20_addresses.payment_obligation,
        "demand": ERC20PaymentObligationData(data["address"], data["value"], payee).encode_self(),
    }


def erc721_payment_demand(env, data, payee):
    return {
        "arbiter": env.addresses.erc721_addresses.payment_obligation,
        "demand": ERC721PaymentObligationData(data["address"], str(data["id"]), payee).encode_self(),
    }


def erc1155_payment_demand(env, data, payee):
    return {
        "arbiter": env.addresses.erc1155_addresses.payment_obligation,
        "demand": ERC1155PaymentObligationData(
            data["address"], str(data["id"]), str(data["value"]), payee
        ).encode_self(),
    }


def native_payment_demand(env, data, payee):
    return {
        "arbiter": env.addresses.native_token_addresses.payment_obligation,
        "demand": NativeTokenPaymentObligationData(str(data["value"]), payee).encode_self(),
    }


def token_bundle_payment_demand(env, data, payee):
    return {
        "arbiter": env.addresses.token_bundle_addresses.payment_obligation,
        "demand": TokenBundlePaymentObligationData(
            str(data.get("native_amount", 0)),
            [item["address"] for item in data.get("erc20s", [])],
            [str(item["value"]) for item in data.get("erc20s", [])],
            [item["address"] for item in data.get("erc721s", [])],
            [str(item["id"]) for item in data.get("erc721s", [])],
            [item["address"] for item in data.get("erc1155s", [])],
            [str(item["id"]) for item in data.get("erc1155s", [])],
            [str(item["value"]) for item in data.get("erc1155s", [])],
            payee,
        ).encode_self(),
    }


async def create_erc20_escrow(client, data, demand, expiration=0):
    await client.erc20.util.approve(data, "escrow")
    return await client.erc20.escrow.default.create(data, demand, expiration)


async def create_erc721_escrow(client, data, demand, expiration=0):
    await client.erc721.util.approve(data, "escrow")
    return await client.erc721.escrow.default.create(data, demand, expiration)


async def create_erc1155_escrow(client, data, demand, expiration=0):
    await client.erc1155.util.approve_all(data["address"], "escrow")
    return await client.erc1155.escrow.default.create(data, demand, expiration)


async def create_native_escrow(client, data, demand, expiration=0):
    return await client.native_token.escrow.default.create(data, demand, expiration)


async def create_token_bundle_escrow(client, data, demand, expiration=0):
    await client.token_bundle.util.approve(data, "escrow")
    return await client.token_bundle.escrow.default.create(data, demand, expiration)
