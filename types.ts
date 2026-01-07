
export enum ServerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  STARTING = 'starting',
  STOPPING = 'stopping',
  INSTALLING = 'installing'
}

export interface ServerStats {
  cpu: number[];
  ram: number;
  maxRam: number;
  disk: number;
  maxDisk: number;
  networkUp: number;
  networkDown: number;
}

export interface Allocation {
  id: string;
  ip: string;
  port: number;
  alias: string;
  isPrimary: boolean;
}

export interface EggVariable {
  name: string;
  description: string;
  env_variable: string;
  default_value: string;
  user_viewable: boolean;
  user_editable: boolean;
  rules: string;
}

export interface PterodactylEgg {
  name: string;
  docker_image: string;
  startup_command: string;
  variables: EggVariable[];
}

export interface Node {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: 'online' | 'offline';
  load: number;
  memory: string;
  disk: string;
  location: string;
  totalCpuCores: number;
  totalRamGb: number;
  usedRamGb: number;
  uptime: string;
}

export interface Database {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  connections: number;
}

export interface Backup {
  id: string;
  name: string;
  size: string;
  checksum: string;
  createdAt: string;
  isSuccessful: boolean;
}

export interface ScheduleTask {
  id: string;
  action: 'start' | 'stop' | 'restart' | 'backup';
  payload?: string;
  order: number;
}

export interface Schedule {
  id: string;
  name: string;
  cron: string;
  isActive: boolean;
  lastRunAt: string | null;
  tasks: ScheduleTask[];
}

export type Permission = 'view-console' | 'send-commands' | 'edit-files' | 'restart-server' | 'manage-backups' | 'manage-databases';

export interface SubUser {
  id: string;
  email: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  serverCount: number;
  twoFactorEnabled: boolean;
  lastLogin: string;
}

export interface GameServer {
  id: string;
  name: string;
  ip: string;
  port: number;
  status: ServerStatus;
  game: string;
  stats: ServerStats;
  egg?: PterodactylEgg;
  env_values?: Record<string, string>;
  databases?: Database[];
  backups?: Backup[];
  subusers?: SubUser[];
  allocations?: Allocation[];
  schedules?: Schedule[];
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'warn' | 'command';
}

export interface FileEntry {
  name: string;
  size: string;
  modified: string;
  isDirectory: boolean;
}
