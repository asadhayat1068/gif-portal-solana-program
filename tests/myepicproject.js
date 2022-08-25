const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log('Starting test...');

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Myepicproject;

  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [baseAccount],
  });

  console.log('Your Tx Signature is: ', tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('Total GIFS = ', account.totalGifs.toString());

  const tx2 = await program.rpc.addGif("__GIF_LINK_GOES_HERE__", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey
    }
  });

  console.log('Your Tx2 Signature is: ', tx2);

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('Total GIFS = ', account.totalGifs.toString());
  console.log('GIF LIST = ', JSON.stringify(account.gifList));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
