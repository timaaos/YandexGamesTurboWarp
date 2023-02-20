class YaGamesExtension {
  getInfo() {
    return {
      id: 'yandexgames',
      name: 'Yandex Games SDK',

      blocks: [
        {
          // `opcode` is the internal ID of the block
          // It should never change!
          // It corresponds to the class method with the same name.
          opcode: 'initsdk',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Initialize SDK'
        }
      ]
    };
  }
  initsdk() {
    // You can just return a value: any string, boolean, or number will work.
    // If you have to perform an asynchronous action like a request, just return a Promise.
    // The block will wait until the Promise resolves and return the resolved value.
    return 'Hello, world!';
  }
}

Scratch.extensions.register(new YaGamesExtension());
