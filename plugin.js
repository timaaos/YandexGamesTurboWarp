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
              },
              {
                  opcode: 'getsavedvar',
                  blockType: Scratch.BlockType.REPORTER,
                  text: 'Get saved variable [NAME] default value [DEFVAL]',
                  arguments: {
                    NAME: {
                        defaultValue: 'money',
                        type: Scratch.ArgumentType.STRING
                    },
                    DEFVAL: {
                        defaultValue: '100',
                        type: Scratch.ArgumentType.STRING
                    }
                  }
              },
              {
                  opcode: 'setsavedvar',
                  blockType: Scratch.BlockType.COMMAND,
                  text: 'Set saved variable [NAME] value [VALUE]',
                  arguments: {
                    NAME: {
                        defaultValue: 'money',
                        type: Scratch.ArgumentType.STRING
                    },
                    VALUE: {
                        defaultValue: '100',
                        type: Scratch.ArgumentType.STRING
                    }
                  }
              },
              {
                  opcode: 'sdkenabled',
                  blockType: Scratch.BlockType.BOOLEAN,
                  text: 'Is SDK Enabled'
              },
              {
                  opcode: 'dataloaded',
                  blockType: Scratch.BlockType.BOOLEAN,
                  text: 'Is data loaded?'
              },
              {
                opcode: 'savevars',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Save progress'
              },
              {
                opcode: 'loadvars',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Load progress'
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
              await YaGames.init().then(ysdk => {
                window.ysdk = ysdk;
                ysdk.features.LoadingAPI.ready();
                ysdk.getPlayer().then(_player => {
                    var player = _player;
                    window.ysdkplayer = player;
                    console.log(window.ysdkplayer);
                    console.log();
                });
              });
              console.log("Initialized YaGames!");
          }
      }
      async loadvars () {
        if(window.ysdkplayer != undefined){
            var data = window.ysdkplayer.getData().then((data) => {
                console.log(window.ysdkplayer, data);
                window.ysdkdata = data;
                console.log("Succesfully loaded data!");
            });
        }
      }
      setsavedvar (args) {
        window.ysdkdata[args.NAME] = args.VALUE;
        return;
      }
      getsavedvar (args) {
        return window.ysdkdata[args.NAME] || args.DEFVAL;
      }
      savevars () {
        if(window.ysdkplayer != undefined && window.ysdkdata != undefined){
            window.ysdkplayer.setData(window.ysdkdata, true).then(() => {
                console.log("Successfully saved data!");
            }).catch((err) => {
                console.log("Couldnt save data!")
            });
        }
      }
      sdkenabled () {
        return (window.ysdk != undefined);
      }
      dataloaded () {
        return (window.ysdkplayer != undefined && window.ysdkdata != undefined);
      }
      showfullscreen () {
          if(window.ysdk != undefined){
            window.ysdk.adv.showFullscreenAdv();
          }
      }
    }
    Scratch.extensions.register(new YaGamesSDKExtension());
  })(Scratch);