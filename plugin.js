(function(Scratch) {
    'use strict';
    class YaGamesSDKExtension {
      getInfo () {
        return {
           id: 'yagames',
           name: 'Yandex Games SDK',
           color1: '#4C1CBA',
           blocks: [
              {
                  opcode: 'initsdk',
                  blockType: Scratch.BlockType.COMMAND,
                  text: 'Initialize YaGames SDK'
              },
              {
                  opcode: 'setdebug',
                  blockType: Scratch.BlockType.COMMAND,
                  text: 'Enable debug mode'
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
              },
              {
                opcode: 'showfullscreen',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Show fullscreen ad'
              },
              {
                opcode:'whenFullscreenClosed',
                blockType: Scratch.BlockType.HAT,
                func: 'isFullscreenClosed',
                text: 'When fullscreen ad closed'
              },
              {
                opcode: 'fullscreenClosed',
                blockType: Scratch.BlockType.BOOLEAN,
                text: 'Is fullscreen ad closed?'
              },
              {
                opcode: 'showrewarded',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Show rewarded ad'
              },
              {
                opcode:'whenRewardedWatched',
                blockType: Scratch.BlockType.HAT,
                func: 'isRewardedWatched',
                text: 'When rewarded ad shown'
              },
              {
                opcode: 'rewardedRewarded',
                blockType: Scratch.BlockType.BOOLEAN,
                text: 'Did Rewarded Ad give reward?'
              }
           ]
        };
      }
      whenRewardedWatched() {
        console.log("wathced!");
      }
      rewardedRewarded () {
        return (window.isrewarded == true);
      }
      triggerIRW () {
        window.triggerIRW = true;
      }
      triggerIFC () {
        window.triggerIFC = true;
      }
      isRewardedWatched () {
        if(window.triggerIRW){
            window.triggerIRW = false;
            return true;
        }
        return false;
      }
      isFullscreenClosed () {
        if(window.triggerIFC){
            window.triggerIFC = false;
            return true;
        }
        return false;
      }
      fullscreenClosed () {
        return (window.isfullscreenclosed == true);
      }
      initsdk () {
        if(window.ysdkdebug == true){
            window.ysdk = {};
            window.ysdkplayer = {};
            return;
        }
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
                }).catch((err) => {
                    
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
        }else{
            window.ysdkdebug = true;
            window.ysdkdata = {};
        }
      }
      setdebug () {
        window.ysdkdebug = true;
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
        return ((window.ysdkplayer != undefined) && window.ysdkdata != undefined);
      }
      showfullscreen () {
        window.isfullscreenclosed = false;
        if(window.ysdkdebug){
            alert("Fullscreen ad!");
            window.isfullscreenclosed = true;
            this.triggerIFC();
            return;
        }
        if(window.ysdk != undefined){
          window.ysdk.adv.showFullscreenAdv({
              callbacks: {
                  onClose: function(wasShown) {
                    window.isfullscreenclosed = true;
                    this.triggerIFC();
                  },
                  onError: function(error) {
                      window.isfullscreenclosed = true;
                      this.triggerIFC();
                  }
              }
          })
        }
      }
      showrewarded () {
        window.isrewardedwatched = false;
        window.isrewarded = false;
        if(window.ysdkdebug){
            var pr = prompt('DEBUG Rewarded Ad! Write C to close it, write R to get trigger reward.');
            if(pr.toLowerCase() == 'c'){
                window.isrewardedwatched = true;
                window.isrewarded = false;
            }else if(pr.toLowerCase() == 'r'){
                window.isrewardedwatched = true;
                window.isrewarded = true;
            }
            this.triggerIRW();
            return;
        }
        window.ysdk.adv.showRewardedVideo({
            callbacks: {
                onOpen: () => {
                  window.isrewardedwatched = false;
                  window.isrewarded = false;
                },
                onRewarded: () => {
                    window.isrewarded = true;
                    this.triggerIRW();
                },
                onClose: () => {
                    window.isrewardedwatched = true;
                    this.triggerIRW();
                }, 
                onError: (e) => {
                    window.isrewardedwatched = false;
                    window.isrewarded = false;
                }
            }
        });
      }
    }
    Scratch.extensions.register(new YaGamesSDKExtension());
  })(Scratch);