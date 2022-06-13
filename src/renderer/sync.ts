import Player, { Events } from "./player";


export class Sync {
  private socket: WebSocket | undefined;

  constructor(public player: Player) {
  }

  private send(name: string, ...args: any[]) {
    this.socket?.send(JSON.stringify({ name, args }));
  }

  private bindToPlayer() {
    Object.entries(Events).forEach(([name]) => {
      this.player.on(name as keyof typeof Events, args => {
        this.send(name, args);
      });
    });
  }
  
  public joinRoom(roomId: string) {
    this.socket = new WebSocket(encodeURI(`ws://localhost:7270/socket/${roomId}`));
    this.socket.onopen = () => {
      console.log(`Connected to room ${roomId}`);
      this.bindToPlayer();
    }
    this.socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      const { name, args } = data // muahahah 👺;

      switch (name) {
        case "play":
          this.player.play();
          break;
        case "pause":
          this.player.pause();
          break;
        case "seekTo":
          this.player.seekTo(args);
          break;
        case "setVolume":
          this.player.setVolume(args);
          break;
      }
    }
  }

  public leaveRoom() {
    this.socket?.close();
    this.socket = undefined;
  }
}