
import { GameServer, ServerStatus, PterodactylEgg, Node, User } from './types';

export const MOCK_EGG_MINECRAFT: PterodactylEgg = {
  name: "Minecraft Vanilla",
  docker_image: "ghcr.io/pterodactyl/yolks:java_17",
  startup_command: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
  variables: [
    {
      name: "Server Jar File",
      description: "The name of the jar file to run the server with.",
      env_variable: "SERVER_JARFILE",
      default_value: "server.jar",
      user_viewable: true,
      user_editable: true,
      rules: "required|string|max:20"
    },
    {
      name: "Minecraft Version",
      description: "The version of Minecraft to install.",
      env_variable: "MINECRAFT_VERSION",
      default_value: "latest",
      user_viewable: true,
      user_editable: true,
      rules: "required|string"
    }
  ]
};

export const MOCK_NODES: Node[] = [
  { 
    id: 'n1', 
    name: 'EU-CORE-01', 
    ip: '142.250.180.14', 
    port: 8080, 
    status: 'online', 
    load: 34, 
    memory: '128GB', 
    disk: '2TB',
    location: 'Frankfurt, DE',
    totalCpuCores: 32,
    totalRamGb: 128,
    usedRamGb: 44.2,
    uptime: '14d 2h'
  },
  { 
    id: 'n2', 
    name: 'US-EAST-02', 
    ip: '34.233.12.99', 
    port: 8080, 
    status: 'online', 
    load: 12, 
    memory: '64GB', 
    disk: '1TB',
    location: 'New York, US',
    totalCpuCores: 16,
    totalRamGb: 64,
    usedRamGb: 12.8,
    uptime: '42d 18h'
  }
];

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'alex_stark', email: 'alex@blgpanel.io', role: 'admin', serverCount: 12, twoFactorEnabled: true, lastLogin: '2m ago' },
  { id: 'u2', username: 'mod_dev', email: 'dev@blgpanel.io', role: 'user', serverCount: 2, twoFactorEnabled: false, lastLogin: '1h ago' },
];

export const MOCK_SERVERS: GameServer[] = [
  {
    id: '1',
    name: 'Survival Vanilla',
    ip: '192.168.1.10',
    port: 25565,
    status: ServerStatus.ONLINE,
    game: 'Minecraft',
    egg: MOCK_EGG_MINECRAFT,
    env_values: {
      SERVER_JARFILE: 'server.jar',
      MINECRAFT_VERSION: '1.20.1'
    },
    databases: [
      { id: 'db1', name: 's1_mc_data', host: 'db.nexus.io', port: 3306, username: 'u1_data', connections: 4 }
    ],
    backups: [
      { id: 'bk1', name: 'Daily_Auto_Backup', size: '1.2GB', checksum: 'sha256:4421...', createdAt: '2023-10-27 04:00', isSuccessful: true }
    ],
    schedules: [
      {
        id: 'sch1',
        name: 'Daily Optimization',
        cron: '0 4 * * *',
        isActive: true,
        lastRunAt: '2023-10-26 04:00',
        tasks: [
          { id: 't1', action: 'restart', order: 1 },
          { id: 't2', action: 'backup', order: 2 }
        ]
      }
    ],
    subusers: [
      { id: 'su1', email: 'moderator@nexus.io', permissions: ['view-console', 'send-commands', 'restart-server'] }
    ],
    allocations: [
      { id: 'a1', ip: '192.168.1.10', port: 25565, alias: 'Primary Game Port', isPrimary: true }
    ],
    stats: {
      cpu: [12, 15, 8, 22, 18, 25, 30, 15, 12, 10],
      ram: 4096,
      maxRam: 8192,
      disk: 15,
      maxDisk: 50,
      networkUp: 124,
      networkDown: 45
    }
  },
  {
    id: '3',
    name: 'Lobby Primary',
    ip: '192.168.1.15',
    port: 25570,
    status: ServerStatus.INSTALLING,
    game: 'Minecraft',
    stats: {
      cpu: [0],
      ram: 0,
      maxRam: 2048,
      disk: 0,
      maxDisk: 10,
      networkUp: 0,
      networkDown: 0
    }
  }
];
