const { expect } = require("chai");
const openseaConst = require('../opensea_const');

async function hashCode(addr) {
  const code = await hre.ethers.provider.getCode(addr);
  const bytes = Buffer.from(code.substring(2), 'hex');
  const hash = hre.ethers.utils.sha256(bytes);
  return hash;
}

describe("Opensea contracts", function () {
  it("deploy KELYESS_CREATE2", async function () {
    const hash = await hashCode(openseaConst.KEYLESS_CREATE2_ADDRESS);
    expect(hash).to.equal('0xd57dbd6bb7cb4d5f65a181bb65739d9c91100dd3ec884da454a17147d5eeee3c');
  });

  it("deploy INEFFICIENT_IMMUTABLE_CREATE2_FACTORY_ADDRESS", async function () {
    const hash = await hashCode(openseaConst.INEFFICIENT_IMMUTABLE_CREATE2_FACTORY_ADDRESS);
    expect(hash).to.equal('0xd39b3e826db8a42c560d8b6318c6d6d1e2b42b846ecd6aead6f45b8479de1a45');
  });

  it("deploy IMMUTABLE_CREATE2_FACTORY_ADDRESS", async function () {
    const hash = await hashCode(openseaConst.IMMUTABLE_CREATE2_FACTORY_ADDRESS);
    expect(hash).to.equal('0xd39b3e826db8a42c560d8b6318c6d6d1e2b42b846ecd6aead6f45b8479de1a45');
  });

  it("deploy ConduitController", async function () {
    const hash = await hashCode(openseaConst.ConduitController);
    expect(hash).to.equal('0x0ea0783f743206971c58e97a7f9a91aeac1ae752d0ea45b7ce7d0117a6b38b15');
  });

  it("deploy Seaport 1.1", async function () {
    const hash = await hashCode(openseaConst.Seaport_1_1);
    expect(hash).to.equal('0x692aa5085ef46fdca13c447bad24ebd61c3fcf6280883345bdd8fbff16d31d81');
  });
});
