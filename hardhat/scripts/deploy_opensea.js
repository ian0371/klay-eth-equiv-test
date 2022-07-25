const openseaConst = require('../opensea_const');

async function deploy() {
  const rich = new hre.ethers.Wallet(hre.network.config.rich, hre.ethers.provider);

  {
    const tx = await rich.sendTransaction({
      to: openseaConst.KEYLESS_CREATE2_DEPLOYER_ADDRESS,
      value: '10000000000000000000',
    });
    await hre.ethers.provider.waitForTransaction(tx.hash);
    console.log('sent 10 KLAY to deployer');
  };

  {
    const tx = await hre.ethers.provider.sendTransaction(openseaConst.DEPLOY_CREATE2_ADDRESS);
    await tx.wait();
    console.log('deployed CREATE2');
  };

  {
    const tx = await rich.sendTransaction({
      to: openseaConst.KEYLESS_CREATE2_ADDRESS,
      data: openseaConst.DEPLOY_INEFFICIENT_IMMUTABLE_CREATE2_FACTORY_ADDRESS,
    });
    await tx.wait();
    console.log('deployed inefficient immutable CREATE2 factory');
  };

  {
    const tx = await rich.sendTransaction({
      to: openseaConst.INEFFICIENT_IMMUTABLE_CREATE2_FACTORY_ADDRESS,
      data: openseaConst.DEPLOY_IMMUTABLE_CREATE2_FACTORY_ADDRESS,
    });
    await tx.wait();
    console.log('deployed immutable CREATE2 factory');
  };

  {
    const tx = await rich.sendTransaction({
      to: openseaConst.IMMUTABLE_CREATE2_FACTORY_ADDRESS,
      data: openseaConst.DEPLOY_CC,
    });
    await tx.wait();
    console.log('deployed ConduitController');
  };

  {
    const tx = await rich.sendTransaction({
      to: openseaConst.IMMUTABLE_CREATE2_FACTORY_ADDRESS,
      data: openseaConst.DEPLOY_SEAPORT,
    });
    await tx.wait();
    console.log('deployed SeaPort 1.1');
  };
};

deploy();
