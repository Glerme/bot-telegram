interface BotCommand {
  command: string;
  args?: string;
  description?: string;
}

export const commands: BotCommand[] = [
  {
    command: "/rastreio",
    args: "<Códigos de rastreio>",
    description: `Rastreio de encomenda separados por ;
      Ex: /rastreio XX000000000XX \n /rastreio XX000000000XX;XX000000000XX;XX000000000XX
    `,
  },
  {
    command: "/salvar",
    args: "<Códigos de rastreio>",
    description: `Salve vários códigos de rastreio nos favoritos separados por ;
    Ex: /salvar XX000000000XX \n /salvar XX000000000XX;XX000000000XX;XX000000000XX
    `,
  },
  {
    command: "/listar",
    description:
      "Listagem de todos os códigos de rastreio salvos nos favoritos",
  },
  {
    command: "/help",
    description: "Obter a lista de comandos",
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
