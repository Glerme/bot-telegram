interface BotCommand {
  command: string;
  args?: string;
  description: string;
}

const commands: BotCommand[] = [
  {
    command: "/help",
    description: "Obter a lista de comandos",
  },
  {
    command: "/rastreio",
    args: "<Código de rastreio>",
    description: "Rastreio de encomenda",
  },
];

const getCommand = (commandName: string) => {
  const command = commands.find((x) => x.command == commandName);
  if (!command) throw new Error("Invalid command" + commandName);

  return command;
};

const getCommandFullDescription = (x: BotCommand) =>
  `${x.command}${x.args ? " " + x.args : ""} - ${x.description}`;

const getCommandListText = () =>
  commands.map(getCommandFullDescription).join("\n");

export {
  getCommand,
  getCommandFullDescription,
  getCommandListText,
  BotCommand,
};
