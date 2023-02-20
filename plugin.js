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
    console.log("Trying to init SDK");
  }
}

Scratch.extensions.register(new YaGamesExtension());
