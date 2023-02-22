(function(Scratch) {
    'use strict';
    class YaGamesSDKExtension {
      getInfo () {
        return {
           id: 'yagames',
           name: 'Yandex Games SDK',
           blocks: [
              {
                  opcode: 'initsdk',
                  blockType: Scratch.BlockType.COMMAND,
                  text: 'Initialize YaGames SDK'
              }
           ]
        };
      }
      initsdk () {
          var script = document.createElement("script");
          script.src = "https://yandex.ru/games/sdk/v2";
          document.head.appendChild(script);
          script.onload = async function(){
              console.log(YaGames);
              await YaGames.init();
              console.log("Initialized YaGames!")
          }
      }
    }
    Scratch.extensions.register(new YaGamesSDKExtension());
  })(Scratch);