import { describe, test, expect } from "bun:test";

// ERC20 codecs
import {
  encodeObligation as encodeErc20NonTierableEscrow,
  decodeObligation as decodeErc20NonTierableEscrow,
  type Erc20NonTierableEscrowObligationData,
} from "../../src/clients/obligations/erc20/escrow/nonTierable";
import {
  encodeObligation as encodeErc20TierableEscrow,
  decodeObligation as decodeErc20TierableEscrow,
  type Erc20TierableEscrowObligationData,
} from "../../src/clients/obligations/erc20/escrow/tierable";
import {
  encodeObligation as encodeErc20Payment,
  decodeObligation as decodeErc20Payment,
  type Erc20PaymentObligationData,
} from "../../src/clients/obligations/erc20/payment";

// ERC721 codecs
import {
  encodeObligation as encodeErc721NonTierableEscrow,
  decodeObligation as decodeErc721NonTierableEscrow,
  type Erc721NonTierableEscrowObligationData,
} from "../../src/clients/obligations/erc721/escrow/nonTierable";
import {
  encodeObligation as encodeErc721TierableEscrow,
  decodeObligation as decodeErc721TierableEscrow,
  type Erc721TierableEscrowObligationData,
} from "../../src/clients/obligations/erc721/escrow/tierable";
import {
  encodeObligation as encodeErc721Payment,
  decodeObligation as decodeErc721Payment,
  type Erc721PaymentObligationData,
} from "../../src/clients/obligations/erc721/payment";

// ERC1155 codecs
import {
  encodeObligation as encodeErc1155NonTierableEscrow,
  decodeObligation as decodeErc1155NonTierableEscrow,
  type Erc1155NonTierableEscrowObligationData,
} from "../../src/clients/obligations/erc1155/escrow/nonTierable";
import {
  encodeObligation as encodeErc1155TierableEscrow,
  decodeObligation as decodeErc1155TierableEscrow,
  type Erc1155TierableEscrowObligationData,
} from "../../src/clients/obligations/erc1155/escrow/tierable";
import {
  encodeObligation as encodeErc1155Payment,
  decodeObligation as decodeErc1155Payment,
  type Erc1155PaymentObligationData,
} from "../../src/clients/obligations/erc1155/payment";

// NativeToken codecs
import {
  encodeObligation as encodeNativeTokenNonTierableEscrow,
  decodeObligation as decodeNativeTokenNonTierableEscrow,
  type NativeTokenNonTierableEscrowObligationData,
} from "../../src/clients/obligations/nativeToken/escrow/nonTierable";
import {
  encodeObligation as encodeNativeTokenTierableEscrow,
  decodeObligation as decodeNativeTokenTierableEscrow,
  type NativeTokenTierableEscrowObligationData,
} from "../../src/clients/obligations/nativeToken/escrow/tierable";
import {
  encodeObligation as encodeNativeTokenPayment,
  decodeObligation as decodeNativeTokenPayment,
  type NativeTokenPaymentObligationData,
} from "../../src/clients/obligations/nativeToken/payment";

// TokenBundle codecs
import {
  encodeObligation as encodeTokenBundleNonTierableEscrow,
  decodeObligation as decodeTokenBundleNonTierableEscrow,
  type TokenBundleNonTierableEscrowObligationData,
} from "../../src/clients/obligations/tokenBundle/escrow/nonTierable";
import {
  encodeObligation as encodeTokenBundleTierableEscrow,
  decodeObligation as decodeTokenBundleTierableEscrow,
  type TokenBundleTierableEscrowObligationData,
} from "../../src/clients/obligations/tokenBundle/escrow/tierable";
import {
  encodeObligation as encodeTokenBundlePayment,
  decodeObligation as decodeTokenBundlePayment,
  type TokenBundlePaymentObligationData,
} from "../../src/clients/obligations/tokenBundle/payment";

// Attestation codecs
import {
  encodeObligation as encodeAttestationEscrowV1,
  decodeObligation as decodeAttestationEscrowV1,
  type AttestationEscrowV1ObligationData,
} from "../../src/clients/obligations/attestation/escrow/v1";
import {
  encodeObligation as encodeAttestationEscrowV2,
  decodeObligation as decodeAttestationEscrowV2,
  type AttestationEscrowV2ObligationData,
} from "../../src/clients/obligations/attestation/escrow/v2";

// String codecs
import {
  encodeObligation as encodeString,
  decodeObligation as decodeString,
  type StringObligationData,
} from "../../src/clients/obligations/string";

// Mock addresses for testing
const mockAddress = "0x1111111111111111111111111111111111111111" as `0x${string}`;
const mockAddress2 = "0x2222222222222222222222222222222222222222" as `0x${string}`;
const mockArbiter = "0x3333333333333333333333333333333333333333" as `0x${string}`;
const mockDemand = "0xdeadbeef" as `0x${string}`;
const mockSchema = "0x4444444444444444444444444444444444444444444444444444444444444444" as `0x${string}`;
const mockRefUID = "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

describe("Obligation Codec Static Functions", () => {
  describe("ERC20 Codecs", () => {
    describe("Non-Tierable Escrow", () => {
      test("should encode and decode ERC20 non-tierable escrow obligation", () => {
        const data: Erc20NonTierableEscrowObligationData = {
          token: mockAddress,
          amount: 1000000n,
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeErc20NonTierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeErc20NonTierableEscrow(encoded);
        expect(decoded.token.toLowerCase()).toBe(data.token.toLowerCase());
        expect(decoded.amount).toBe(data.amount);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
      });

      test("should handle edge cases for ERC20 non-tierable escrow", () => {
        const data: Erc20NonTierableEscrowObligationData = {
          token: mockAddress,
          amount: 0n,
          arbiter: mockArbiter,
          demand: "0x",
        };

        const encoded = encodeErc20NonTierableEscrow(data);
        const decoded = decodeErc20NonTierableEscrow(encoded);
        expect(decoded.amount).toBe(0n);
        expect(decoded.demand).toBe("0x");
      });
    });

    describe("Tierable Escrow", () => {
      test("should encode and decode ERC20 tierable escrow obligation", () => {
        const data: Erc20TierableEscrowObligationData = {
          token: mockAddress,
          amount: 5000000n,
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeErc20TierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeErc20TierableEscrow(encoded);
        expect(decoded.token.toLowerCase()).toBe(data.token.toLowerCase());
        expect(decoded.amount).toBe(data.amount);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
      });
    });

    describe("Payment", () => {
      test("should encode and decode ERC20 payment obligation", () => {
        const data: Erc20PaymentObligationData = {
          token: mockAddress,
          amount: 2500000n,
          payee: mockAddress2,
        };

        const encoded = encodeErc20Payment(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeErc20Payment(encoded);
        expect(decoded.token.toLowerCase()).toBe(data.token.toLowerCase());
        expect(decoded.amount).toBe(data.amount);
        expect(decoded.payee.toLowerCase()).toBe(data.payee.toLowerCase());
      });
    });
  });

  describe("ERC721 Codecs", () => {
    describe("Non-Tierable Escrow", () => {
      test("should encode and decode ERC721 non-tierable escrow obligation", () => {
        const data: Erc721NonTierableEscrowObligationData = {
          token: mockAddress,
          tokenId: 42n,
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeErc721NonTierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeErc721NonTierableEscrow(encoded);
        expect(decoded.token.toLowerCase()).toBe(data.token.toLowerCase());
        expect(decoded.tokenId).toBe(data.tokenId);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
      });
    });

    describe("Tierable Escrow", () => {
      test("should encode and decode ERC721 tierable escrow obligation", () => {
        const data: Erc721TierableEscrowObligationData = {
          token: mockAddress,
          tokenId: 123n,
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeErc721TierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeErc721TierableEscrow(encoded);
        expect(decoded.token.toLowerCase()).toBe(data.token.toLowerCase());
        expect(decoded.tokenId).toBe(data.tokenId);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
      });
    });

    describe("Payment", () => {
      test("should encode and decode ERC721 payment obligation", () => {
        const data: Erc721PaymentObligationData = {
          token: mockAddress,
          tokenId: 999n,
          payee: mockAddress2,
        };

        const encoded = encodeErc721Payment(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeErc721Payment(encoded);
        expect(decoded.token.toLowerCase()).toBe(data.token.toLowerCase());
        expect(decoded.tokenId).toBe(data.tokenId);
        expect(decoded.payee.toLowerCase()).toBe(data.payee.toLowerCase());
      });
    });
  });

  describe("ERC1155 Codecs", () => {
    describe("Non-Tierable Escrow", () => {
      test("should encode and decode ERC1155 non-tierable escrow obligation", () => {
        const data: Erc1155NonTierableEscrowObligationData = {
          token: mockAddress,
          tokenId: 1n,
          amount: 100n,
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeErc1155NonTierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeErc1155NonTierableEscrow(encoded);
        expect(decoded.token.toLowerCase()).toBe(data.token.toLowerCase());
        expect(decoded.tokenId).toBe(data.tokenId);
        expect(decoded.amount).toBe(data.amount);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
      });
    });

    describe("Tierable Escrow", () => {
      test("should encode and decode ERC1155 tierable escrow obligation", () => {
        const data: Erc1155TierableEscrowObligationData = {
          token: mockAddress,
          tokenId: 5n,
          amount: 500n,
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeErc1155TierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeErc1155TierableEscrow(encoded);
        expect(decoded.token.toLowerCase()).toBe(data.token.toLowerCase());
        expect(decoded.tokenId).toBe(data.tokenId);
        expect(decoded.amount).toBe(data.amount);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
      });
    });

    describe("Payment", () => {
      test("should encode and decode ERC1155 payment obligation", () => {
        const data: Erc1155PaymentObligationData = {
          token: mockAddress,
          tokenId: 10n,
          amount: 50n,
          payee: mockAddress2,
        };

        const encoded = encodeErc1155Payment(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeErc1155Payment(encoded);
        expect(decoded.token.toLowerCase()).toBe(data.token.toLowerCase());
        expect(decoded.tokenId).toBe(data.tokenId);
        expect(decoded.amount).toBe(data.amount);
        expect(decoded.payee.toLowerCase()).toBe(data.payee.toLowerCase());
      });
    });
  });

  describe("NativeToken Codecs", () => {
    describe("Non-Tierable Escrow", () => {
      test("should encode and decode NativeToken non-tierable escrow obligation", () => {
        const data: NativeTokenNonTierableEscrowObligationData = {
          arbiter: mockArbiter,
          demand: mockDemand,
          amount: 1000000000000000000n, // 1 ETH
        };

        const encoded = encodeNativeTokenNonTierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeNativeTokenNonTierableEscrow(encoded);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
        expect(decoded.amount).toBe(data.amount);
      });
    });

    describe("Tierable Escrow", () => {
      test("should encode and decode NativeToken tierable escrow obligation", () => {
        const data: NativeTokenTierableEscrowObligationData = {
          arbiter: mockArbiter,
          demand: mockDemand,
          amount: 500000000000000000n, // 0.5 ETH
        };

        const encoded = encodeNativeTokenTierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeNativeTokenTierableEscrow(encoded);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
        expect(decoded.amount).toBe(data.amount);
      });
    });

    describe("Payment", () => {
      test("should encode and decode NativeToken payment obligation", () => {
        const data: NativeTokenPaymentObligationData = {
          amount: 250000000000000000n, // 0.25 ETH
          payee: mockAddress2,
        };

        const encoded = encodeNativeTokenPayment(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeNativeTokenPayment(encoded);
        expect(decoded.amount).toBe(data.amount);
        expect(decoded.payee.toLowerCase()).toBe(data.payee.toLowerCase());
      });
    });
  });

  describe("TokenBundle Codecs", () => {
    describe("Non-Tierable Escrow", () => {
      test("should encode and decode TokenBundle non-tierable escrow obligation", () => {
        const data: TokenBundleNonTierableEscrowObligationData = {
          nativeAmount: 1000000000000000000n,
          erc20Tokens: [mockAddress],
          erc20Amounts: [5000000n],
          erc721Tokens: [mockAddress2],
          erc721TokenIds: [42n],
          erc1155Tokens: [],
          erc1155TokenIds: [],
          erc1155Amounts: [],
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeTokenBundleNonTierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeTokenBundleNonTierableEscrow(encoded);
        expect(decoded.nativeAmount).toBe(data.nativeAmount);
        expect(decoded.erc20Tokens.length).toBe(1);
        expect(decoded.erc20Tokens[0]!.toLowerCase()).toBe(data.erc20Tokens[0]!.toLowerCase());
        expect(decoded.erc20Amounts[0]).toBe(data.erc20Amounts[0]);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
      });

      test("should handle empty token bundle", () => {
        const data: TokenBundleNonTierableEscrowObligationData = {
          nativeAmount: 0n,
          erc20Tokens: [],
          erc20Amounts: [],
          erc721Tokens: [],
          erc721TokenIds: [],
          erc1155Tokens: [],
          erc1155TokenIds: [],
          erc1155Amounts: [],
          arbiter: mockArbiter,
          demand: "0x",
        };

        const encoded = encodeTokenBundleNonTierableEscrow(data);
        const decoded = decodeTokenBundleNonTierableEscrow(encoded);
        expect(decoded.nativeAmount).toBe(0n);
        expect(decoded.erc20Tokens.length).toBe(0);
      });
    });

    describe("Tierable Escrow", () => {
      test("should encode and decode TokenBundle tierable escrow obligation", () => {
        const data: TokenBundleTierableEscrowObligationData = {
          nativeAmount: 2000000000000000000n,
          erc20Tokens: [mockAddress, mockAddress2],
          erc20Amounts: [1000000n, 2000000n],
          erc721Tokens: [],
          erc721TokenIds: [],
          erc1155Tokens: [mockAddress],
          erc1155TokenIds: [1n],
          erc1155Amounts: [100n],
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeTokenBundleTierableEscrow(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeTokenBundleTierableEscrow(encoded);
        expect(decoded.nativeAmount).toBe(data.nativeAmount);
        expect(decoded.erc20Tokens.length).toBe(2);
        expect(decoded.erc1155Tokens.length).toBe(1);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
      });
    });

    describe("Payment", () => {
      test("should encode and decode TokenBundle payment obligation", () => {
        const data: TokenBundlePaymentObligationData = {
          nativeAmount: 500000000000000000n,
          erc20Tokens: [mockAddress],
          erc20Amounts: [3000000n],
          erc721Tokens: [],
          erc721TokenIds: [],
          erc1155Tokens: [],
          erc1155TokenIds: [],
          erc1155Amounts: [],
          payee: mockAddress2,
        };

        const encoded = encodeTokenBundlePayment(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeTokenBundlePayment(encoded);
        expect(decoded.nativeAmount).toBe(data.nativeAmount);
        expect(decoded.erc20Tokens.length).toBe(1);
        expect(decoded.payee.toLowerCase()).toBe(data.payee.toLowerCase());
      });
    });
  });

  describe("Attestation Codecs", () => {
    describe("Escrow V1", () => {
      test("should encode and decode Attestation escrow V1 obligation", () => {
        const data: AttestationEscrowV1ObligationData = {
          attestation: {
            schema: mockSchema,
            data: {
              recipient: mockAddress,
              expirationTime: 0n,
              revocable: true,
              refUID: mockRefUID,
              data: "0x1234",
              value: 0n,
            },
          },
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeAttestationEscrowV1(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeAttestationEscrowV1(encoded);
        expect(decoded.attestation.schema).toBe(data.attestation.schema);
        expect(decoded.attestation.data.recipient.toLowerCase()).toBe(data.attestation.data.recipient.toLowerCase());
        expect(decoded.attestation.data.revocable).toBe(data.attestation.data.revocable);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
      });
    });

    describe("Escrow V2", () => {
      test("should encode and decode Attestation escrow V2 obligation", () => {
        const data: AttestationEscrowV2ObligationData = {
          attestationUid: mockSchema, // Using mockSchema as a 32-byte UID
          arbiter: mockArbiter,
          demand: mockDemand,
        };

        const encoded = encodeAttestationEscrowV2(data);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = decodeAttestationEscrowV2(encoded);
        expect(decoded.attestationUid).toBe(data.attestationUid);
        expect(decoded.arbiter.toLowerCase()).toBe(data.arbiter.toLowerCase());
        expect(decoded.demand).toBe(data.demand);
      });
    });
  });

  describe("String Codecs", () => {
    test("should encode and decode String obligation", () => {
      const data: StringObligationData = {
        item: "Hello, World!",
      };

      const encoded = encodeString(data);
      expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

      const decoded = decodeString(encoded);
      expect(decoded.item).toBe(data.item);
    });

    test("should handle empty string", () => {
      const data: StringObligationData = {
        item: "",
      };

      const encoded = encodeString(data);
      const decoded = decodeString(encoded);
      expect(decoded.item).toBe("");
    });

    test("should handle JSON string", () => {
      const jsonData = { name: "test", value: 123 };
      const data: StringObligationData = {
        item: JSON.stringify(jsonData),
      };

      const encoded = encodeString(data);
      const decoded = decodeString(encoded);
      expect(JSON.parse(decoded.item)).toEqual(jsonData);
    });

    test("should handle unicode characters", () => {
      const data: StringObligationData = {
        item: "Hello, 世界! 🌍",
      };

      const encoded = encodeString(data);
      const decoded = decodeString(encoded);
      expect(decoded.item).toBe(data.item);
    });
  });

  describe("Round-trip consistency", () => {
    test("multiple encodes of same data should produce identical output", () => {
      const data: Erc20NonTierableEscrowObligationData = {
        token: mockAddress,
        amount: 1000000n,
        arbiter: mockArbiter,
        demand: mockDemand,
      };

      const encoded1 = encodeErc20NonTierableEscrow(data);
      const encoded2 = encodeErc20NonTierableEscrow(data);
      expect(encoded1).toBe(encoded2);
    });

    test("decode-encode-decode should preserve data", () => {
      const originalData: Erc721NonTierableEscrowObligationData = {
        token: mockAddress,
        tokenId: 12345n,
        arbiter: mockArbiter,
        demand: mockDemand,
      };

      const encoded1 = encodeErc721NonTierableEscrow(originalData);
      const decoded1 = decodeErc721NonTierableEscrow(encoded1);
      const encoded2 = encodeErc721NonTierableEscrow(decoded1);
      const decoded2 = decodeErc721NonTierableEscrow(encoded2);

      expect(decoded2.token.toLowerCase()).toBe(originalData.token.toLowerCase());
      expect(decoded2.tokenId).toBe(originalData.tokenId);
      expect(decoded2.arbiter.toLowerCase()).toBe(originalData.arbiter.toLowerCase());
      expect(decoded2.demand).toBe(originalData.demand);
    });
  });

  describe("Large values", () => {
    test("should handle large bigint values", () => {
      const data: Erc20NonTierableEscrowObligationData = {
        token: mockAddress,
        amount: 2n ** 128n - 1n, // Large but valid uint256 value
        arbiter: mockArbiter,
        demand: mockDemand,
      };

      const encoded = encodeErc20NonTierableEscrow(data);
      const decoded = decodeErc20NonTierableEscrow(encoded);
      expect(decoded.amount).toBe(data.amount);
    });

    test("should handle max uint256 for token IDs", () => {
      const data: Erc721NonTierableEscrowObligationData = {
        token: mockAddress,
        tokenId: 2n ** 256n - 1n,
        arbiter: mockArbiter,
        demand: mockDemand,
      };

      const encoded = encodeErc721NonTierableEscrow(data);
      const decoded = decodeErc721NonTierableEscrow(encoded);
      expect(decoded.tokenId).toBe(data.tokenId);
    });
  });
});
