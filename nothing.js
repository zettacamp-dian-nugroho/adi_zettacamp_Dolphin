async function exploreEventLoopWithPromise() {
    return new Promise((resolve) => {
      resolve(
        new Promise(async (resolved) => {
          for (let i = 0; i < 5; i++) {
            console.log(`Looping ke-${i + 1}`);
            await new Promise((_) => setTimeout(_, 2000));
          }
          resolved(true);
          console.log(true)
        })
      );
    });
  }