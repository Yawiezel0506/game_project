

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const scoreEl = document.querySelector("#scoreEl");

onload = () => {
  // default the canvas size
  
  canvas.width = innerWidth - 20;
  canvas.height = innerHeight - 111;

  declareEvents();
};

const declareEvents = () => {
  // create an empty array for pallets
  const pallets = [];

  //   create an empty array for bounderys
  const bounderys = [];

  //   create an empty array for powerUps
  const powerUps = [];

  // array for ghosts colors
  const ghostColors = [
    'mediumseagreen' , 'olivedrab', 'orchid', 'mediumvioletred', 'deeppink', 'purple', 'palevioletred', 'darksalmon', 'coral', '	teal', 'darkcyan', 'darkslategray', 'darkred', 'darkseagreen', 'indianred', 'indigo', 'lightcoral', 'lightsalmon', 'mediumpurple'
  ]

  // array for ghosts random position
  const ghostsRandomPosition = [5,11,23,29];

  
  //   create an array for ghost
  const ghosts = [
    new Ghosts({
      position: {
        x: Boundary.width * 6,
        y: Boundary.height + Boundary.height / 2,
      },
      velocity: {
        x: Ghosts.speed,
        y: 0,
      },
    }),
    
  ];

  // function to create ghosts
  const addGhost =()=> {
    let newGhost = new Ghosts({
      position: {
        x: Boundary.width * ghostsRandomPosition[Math.floor(Math.random() * ghostsRandomPosition.length)],
        y: Boundary.height * 4 + Boundary.height / 2,
      },
      velocity: {
        x: Ghosts.speed,
        y: 0,
      },
      color: ghostColors[Math.floor(Math.random() * ghostColors.length)],
    });
    ghosts.push(newGhost);
  }

  setInterval(addGhost, 10000);

  
  // default key to false
  const keys = {
    ArrowUp: {
      pressed: false,
    },
    ArrowDown: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
  };

  //   create an var for the last key who pressed
  let lastKey = "";

  //  create an var equale to 0 for the score
  let score = 0;

  // create an array for default the map of the boundarys
  const map = [
    ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2", " ", "1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
    ["|", " ", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|", " ", "|", "p", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
    ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|", " ", "|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
    ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|", " ", "|", ".", ".", ".", ".", "_", ".", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
    ["|", ".", "[", "]", ".", ".", ".", "[", "-", "]", ".", ".", ".", "[", "]", ".", "|", " ", "|", ".", "[", "]", ".", ".", ".", "[", "-", "]", ".", ".", ".", "[", "]", ".", "|"],
    ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", ".", "^", ".", ".", ".", ".", "4", "-", "3", ".", ".", ".", ".", "^", ".", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
    ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "[", "+", "]", ".", "b", ".", ".", ".", ".", ".", "b", ".", "[", "+", "]", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
    ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", ".", "_", "p", ".", ".", ".", "1", "-", "2", ".", ".", ".", ".", "_", ".", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
    ["|", ".", "[", "]", ".", ".", ".", "[", "-", "]", ".", ".", ".", "[", "]", ".", "|", " ", "|", ".", "[", "]", ".", ".", ".", "[", "-", "]", ".", ".", ".", "[", "]", ".", "|"],
    ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|", " ", "|", ".", ".", ".", ".", "^", ".", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
    ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|", " ", "|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
    ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|", " ", "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
    ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3", " ", "4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
   
  ];


  //   bild the player with the class
  const player = new Player({
    position: {
      x: Boundary.width + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  });

  //   create the images format
  const createImages = (src) => {
    const image = new Image();
    image.src = src;
    return image;
  };

  // create the bounderys on the array whit the class
  map.forEach((row, i) => {
    row.forEach((simbol, j) => {
      switch (simbol) {
        case "-":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeHorizontal.png"),
            })
          );
          break;
        case "|":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeVertical.png"),
            })
          );
          break;
        case "1":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeCorner1.png"),
            })
          );
          break;
        case "2":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeCorner2.png"),
            })
          );
          break;
        case "3":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeCorner3.png"),
            })
          );
          break;
        case "4":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeCorner4.png"),
            })
          );
          break;
        case "b":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/block.png"),
            })
          );
          break;
        case "[":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/capLeft.png"),
            })
          );
          break;
        case "]":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/capRight.png"),
            })
          );
          break;
        case "_":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/capBottom.png"),
            })
          );
          break;
        case "^":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/capTop.png"),
            })
          );
          break;
        case "+":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeCross.png"),
            })
          );
          break;
        case "5":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeConnectorTop.png"),
            })
          );
          break;
        case "6":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeConnectorRight.png"),
            })
          );
          break;
        case "7":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeConnectorBottom.png"),
            })
          );
          break;
        case "8":
          bounderys.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i,
              },
              image: createImages("./img/pipeConnectorLeft.png"),
            })
          );
          break;
        case ".":
          pallets.push(
            new Pallet({
              position: {
                x: Boundary.width * j + Boundary.width / 2,
                y: Boundary.height * i + Boundary.height / 2,
              },
            })
          );
          break;
        case "p":
          powerUps.push(
            new powerUp({
              position: {
                x: Boundary.width * j + Boundary.width / 2,
                y: Boundary.height * i + Boundary.height / 2,
              },
            })
          );
          break;
      }
    });
  });

  //   function the make sure the player not touch in boundarys (top left bottom and right)
  const circleCollidesWithRectangle = ({ circle, rectangle }) => {
    const padding = Boundary.width / 2 - circle.radius - 1;
    return (
      circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height + padding &&
      circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x - padding &&
      circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y - padding &&
      circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width + padding
      );
    };
    
    //   create an recorsive function for update the position of the player
    let animationId;
    const animate = () => {
    animationId = requestAnimationFrame(animate);
    // clear the canvas on every action
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    // set the buttons of moving to know witch button pressed and to stop on bounarys
    if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
      for (let i = 0; i < bounderys.length; i++) {
        const boundary = bounderys[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...player,
              velocity: {
                x: 0,
                y: -5,
              },
            },
            rectangle: boundary,
          })
          ) {
            player.velocity.y = 0;
            break;
          } else {
            player.velocity.y = -5;
          }
        }
      } else if (keys.ArrowDown.pressed && lastKey === "ArrowDown") {
        for (let i = 0; i < bounderys.length; i++) {
          const boundary = bounderys[i];
          if (
            circleCollidesWithRectangle({
              circle: {
                ...player,
                velocity: {
                  x: 0,
                  y: 5,
                },
              },
              rectangle: boundary,
            })
        ) {
          player.velocity.y = 0;
          break;
        } else {
          player.velocity.y = 5;
        }
      }
    } else if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
      for (let i = 0; i < bounderys.length; i++) {
        const boundary = bounderys[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...player,
              velocity: {
                x: -5,
                y: 0,
              },
            },
            rectangle: boundary,
          })
          ) {
          player.velocity.x = 0;
          break;
        } else {
          player.velocity.x = -5;
        }
      }
    } else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
      for (let i = 0; i < bounderys.length; i++) {
        const boundary = bounderys[i];
        if (
          circleCollidesWithRectangle({
            circle: {
              ...player,
              velocity: {
                x: 5,
                y: 0,
              },
            },
            rectangle: boundary,
          })
          ) {
            player.velocity.x = 0;
            break;
          } else {
            player.velocity.x = 5;
          }
        }
      }
      
      // detect collision between ghost and player
      for (let i = ghosts.length - 1; 0 <= i; i--) {
        const ghost = ghosts[i];
      // ghost touch player
      if (
        Math.hypot(
          ghost.position.x - player.position.x,
          ghost.position.y - player.position.y
          ) <
          ghost.radius + player.radius
          ) {
            if (ghost.scared) {
          ghosts.splice(i, 1);
          score += 75;
          scoreEl.innerHTML = score;
        } else {
          cancelAnimationFrame(animationId);
          
          // console log the canvas
          console.log(c);
        }
      }
    }
    
    // bilt the powerUP
    for (let i = powerUps.length - 1; 0 <= i; i--) {
      const powerUp = powerUps[i];
      powerUp.drow();
      
      // player touch the powerUp
      if (
        Math.hypot(
          powerUp.position.x - player.position.x,
          powerUp.position.y - player.position.y
          ) <
          powerUp.radius + player.radius
          ) {
            powerUps.splice(i, 1);
            
            // make ghost scared
            ghosts.forEach((ghost) => {
              ghost.scared = true;
              
              setTimeout(() => {
                ghost.scared = false;
              }, 9000);
            });
          }
        }
        
        // bild the pallets
        for (let i = pallets.length - 1; 0 <= i; i--) {
          const pallet = pallets[i];
          pallet.drow();
          
          if (
            Math.hypot(
              pallet.position.x - player.position.x,
              pallet.position.y - player.position.y
              ) <
              pallet.radius + player.radius
              ) {
                pallets.splice(i, 1);
                score += 10;
                scoreEl.innerHTML = score;
              }
            }
            
            // win condition
            if (pallets.length === 0) {
              console.log('you win');
              cancelAnimationFrame(animationId);
            }
            
            // bild the bounderys
            bounderys.forEach((boundery) => {
              boundery.drow();
              
              // make sure the player not touch the bounderys (top left bottom and right)
              if (
                circleCollidesWithRectangle({
                  circle: player,
                  rectangle: boundery,
                })
                ) {
                  player.velocity.x = 0;
                  player.velocity.y = 0;
                }
              });
              
              // update the position of the player
              player.update();
              
    // update the position of ghosts
    ghosts.forEach((ghost) => {
      ghost.update();
      
      const collisions = [];
      bounderys.forEach((boundary) => {
        if (
          !collisions.includes("right") &&
          circleCollidesWithRectangle({
            circle: {
              ...ghost,
              velocity: {
                x: ghost.speed,
                y: 0,
              },
            },
            rectangle: boundary,
          })
          ) {
            collisions.push("right");
          }
          if (
            !collisions.includes("left") &&
            circleCollidesWithRectangle({
              circle: {
                ...ghost,
                velocity: {
                  x: -ghost.speed,
                  y: 0,
                },
              },
              rectangle: boundary,
            })
            ) {
              collisions.push("left");
            }
            if (
              !collisions.includes("down") &&
              circleCollidesWithRectangle({
                circle: {
                  ...ghost,
                  velocity: {
                    x: 0,
                    y: ghost.speed,
                  },
                },
                rectangle: boundary,
              })
              ) {
                collisions.push("down");
              }
              if (
          !collisions.includes("up") &&
          circleCollidesWithRectangle({
            circle: {
              ...ghost,
              velocity: {
                x: 0,
                y: -ghost.speed,
              },
            },
            rectangle: boundary,
          })
          ) {
          collisions.push("up");
        }
      });
      
      if (collisions.length > ghost.prevCollisions.length) {
        ghost.prevCollisions = collisions;
      }

      if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
        if (ghost.velocity.x > 0) {
          ghost.prevCollisions.push("right");
        } else if (ghost.velocity.x < 0) {
          ghost.prevCollisions.push("left");
        } else if (ghost.velocity.y < 0) {
          ghost.prevCollisions.push("up");
        } else if (ghost.velocity.y > 0) {
          ghost.prevCollisions.push("down");
        }
        
        const pathways = ghost.prevCollisions.filter((collision) => {
          return !collisions.includes(collision);
        });
        
        const direction = pathways[Math.floor(Math.random() * pathways.length)];
        
        switch (direction) {
          case "down":
            ghost.velocity.y = ghost.speed;
            ghost.velocity.x = 0;
            break;
            case "up":
              ghost.velocity.y = -ghost.speed;
              ghost.velocity.x = 0;
              break;
              case "right":
                ghost.velocity.y = 0;
                ghost.velocity.x = ghost.speed;
                break;
                case "left":
                  ghost.velocity.y = 0;
                  ghost.velocity.x = -ghost.speed;
                  break;
                }
                
                ghost.prevCollisions = [];
              }
            });
            
            // set the direction of the player
            if(player.velocity.x > 0) player.rotation = 0;
            else if(player.velocity.x < 0) player.rotation = Math.PI;
            else if(player.velocity.y < 0) player.rotation = Math.PI + Math.PI / 2;
            else if(player.velocity.y > 0) player.rotation = Math.PI / 2;
          }; // end of animate ()
          
          //   call the recorsive function 
          animate();
          
          
          //   set the button who pressed to true
          window.addEventListener("keydown", ({ key }) => {
            switch (key) {
              case "ArrowUp":
                keys.ArrowUp.pressed = true;
                lastKey = "ArrowUp";
                break;
                case "ArrowDown":
                  keys.ArrowDown.pressed = true;
                  lastKey = "ArrowDown";
                  break;
                  case "ArrowLeft":
                    keys.ArrowLeft.pressed = true;
                    lastKey = "ArrowLeft";
                    break;
                    case "ArrowRight":
                      keys.ArrowRight.pressed = true;
                      lastKey = "ArrowRight";
                      break;
                    }
                  });
                  
                  // set all the buttons to false when stop press
                  window.addEventListener("keyup", ({ key }) => {
                    switch (key) {
                      case "ArrowUp":
        keys.ArrowUp.pressed = false;
        break;
        case "ArrowDown":
          keys.ArrowDown.pressed = false;
          break;
          case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
            case "ArrowRight":
              keys.ArrowRight.pressed = false;
              break;
            }
          });
};
