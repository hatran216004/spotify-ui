import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaMusic,
  FaPlayCircle,
  FaCog,
  FaSearch,
  FaBell,
  FaPlus,
  FaFilter,
  FaCalendarAlt,
  FaDollarSign,
  FaHeadphones,
  FaEllipsisH,
  FaDownload,
  FaArrowUp
} from 'react-icons/fa';
import { MdRadio } from 'react-icons/md';

// Custom Card Components - Dark Theme
function Card({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-800 rounded-lg border border-gray-700 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-6 pb-4 ${className}`}>{children}</div>;
}

function CardTitle({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight text-white ${className}`}
    >
      {children}
    </h3>
  );
}

function CardDescription({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm text-gray-400 mt-1 ${className}`}>{children}</p>
  );
}

function CardContent({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

// Custom Input Component - Dark Theme
function Input({ className = '', ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

// Custom Badge Component - Dark Theme
function Badge({
  children,
  variant = 'default',
  className = ''
}: {
  children: React.ReactNode;
  variant: 'default' | 'secondary' | 'outline';
  className?: string;
}) {
  const variants = {
    default: 'bg-blue-600 text-blue-100',
    secondary: 'bg-gray-600 text-gray-100',
    outline: 'border border-gray-600 text-gray-300'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Custom Avatar Components - Dark Theme
function Avatar({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    >
      {children}
    </div>
  );
}

function AvatarImage({
  src,
  alt = '',
  className = ''
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src || '/placeholder.svg'}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`}
    />
  );
}

function AvatarFallback({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-600 text-gray-200 text-sm font-medium ${className}`}
    >
      {children}
    </div>
  );
}

// Custom Table Components - Dark Theme
function Table({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>
        {children}
      </table>
    </div>
  );
}

function TableHeader({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <thead className={`border-b border-gray-600 ${className}`}>
      {children}
    </thead>
  );
}

function TableBody({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tbody className={`${className}`}>{children}</tbody>;
}

function TableRow({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={`border-b border-gray-700 transition-colors hover:bg-gray-700/50 ${className}`}
    >
      {children}
    </tr>
  );
}

function TableHead({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`h-12 px-4 text-left align-middle font-medium text-gray-300 ${className}`}
    >
      {children}
    </th>
  );
}

function TableCell({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`p-4 align-middle text-gray-100 ${className}`}>
      {children}
    </td>
  );
}

// Custom Dropdown Menu Components - Dark Theme
function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block text-left">{children}</div>;
}

function DropdownMenuTrigger({
  children,
  asChild
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return asChild ? children : <div>{children}</div>;
}

function DropdownMenuContent({
  children,
  align = 'start',
  className = ''
}: {
  children: React.ReactNode;
  align: 'start' | 'end';
  className?: string;
}) {
  return (
    <div
      className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-600 bg-gray-800 p-1 shadow-md ${
        align === 'end' ? 'right-0' : 'left-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({
  children,
  className = '',
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-100 outline-none hover:bg-gray-700 focus:bg-gray-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Custom Progress Component - Dark Theme
function Progress({ value = 0, className = '' }) {
  return (
    <div
      className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-700 ${className}`}
    >
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

const sidebarItems = [
  { icon: FaHome, label: 'Overview', id: 'overview' },
  { icon: FaChartBar, label: 'Analytics', id: 'analytics' },
  { icon: FaUsers, label: 'Users', id: 'users' },
  { icon: FaMusic, label: 'Tracks', id: 'tracks' },
  { icon: FaPlayCircle, label: 'Playlists', id: 'playlists' },
  { icon: MdRadio, label: 'Podcasts', id: 'podcasts' },
  { icon: FaCog, label: 'Settings', id: 'settings' }
];

const recentTracks = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    plays: '2.1M',
    duration: '3:20'
  },
  {
    id: 2,
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    plays: '1.8M',
    duration: '2:54'
  },
  {
    id: 3,
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    plays: '1.5M',
    duration: '3:23'
  },
  {
    id: 4,
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    plays: '1.3M',
    duration: '2:58'
  },
  {
    id: 5,
    title: 'Stay',
    artist: 'The Kid LAROI',
    album: 'F*CK LOVE 3',
    plays: '1.1M',
    duration: '2:21'
  }
];

const topUsers = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    plan: 'Premium',
    joined: '2023-01-15'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    plan: 'Free',
    joined: '2023-02-20'
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike@example.com',
    plan: 'Premium',
    joined: '2023-01-08'
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma@example.com',
    plan: 'Family',
    joined: '2023-03-12'
  }
];

export default function SpotifyAdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (id: string) => {
    // setDropdownOpen((prev) => ({
    //   ...prev,
    //   [id]: !prev[id],
    // }))
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'users':
        return (
          <UsersSection
            toggleDropdown={toggleDropdown}
            dropdownOpen={dropdownOpen}
          />
        );
      case 'tracks':
        return (
          <TracksSection
            toggleDropdown={toggleDropdown}
            dropdownOpen={dropdownOpen}
          />
        );
      case 'playlists':
        return (
          <PlaylistsSection
            toggleDropdown={toggleDropdown}
            dropdownOpen={dropdownOpen}
          />
        );
      case 'podcasts':
        return <PodcastsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <FaMusic className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Spotify Admin</span>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white capitalize">
                {activeSection}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <FaBell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-900">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <FaUsers className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,847,392</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Streams
            </CardTitle>
            <FaPlayCircle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">847.2M</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <FaDollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$1.2M</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Artists
            </CardTitle>
            <FaHeadphones className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45,231</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400">+5.7%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Tracks This Week</CardTitle>
            <CardDescription>
              Most played tracks in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTracks.slice(0, 5).map((track, index) => (
                <div key={track.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-sm font-medium text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-white">
                      {track.title}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {track.artist}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">{track.plays}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user registrations this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Premium Users</span>
                <span className="text-sm font-medium text-white">68%</span>
              </div>
              <Progress value={68} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Free Users</span>
                <span className="text-sm font-medium text-white">32%</span>
              </div>
              <Progress value={32} className="h-2" />

              <div className="pt-4 border-t border-gray-600">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Total New Users</span>
                  <span className="font-medium text-white">+12,847</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Analytics Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <FaCalendarAlt className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <FaDownload className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Listening Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">2.4M</div>
            <p className="text-sm text-gray-400 mt-1">
              <FaArrowUp className="w-4 h-4 inline mr-1 text-green-400" />
              +18% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skip Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">23.5%</div>
            <p className="text-sm text-gray-400 mt-1">-2.1% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">28m</div>
            <p className="text-sm text-gray-400 mt-1">+5.2% vs last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Genres</CardTitle>
          <CardDescription>
            Most popular music genres this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { genre: 'Pop', percentage: 35, streams: '2.1M' },
              { genre: 'Hip Hop', percentage: 28, streams: '1.7M' },
              { genre: 'Rock', percentage: 18, streams: '1.1M' },
              { genre: 'Electronic', percentage: 12, streams: '720K' },
              { genre: 'Jazz', percentage: 7, streams: '420K' }
            ].map((item) => (
              <div key={item.genre} className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium text-white">
                  {item.genre}
                </div>
                <div className="flex-1">
                  <Progress value={item.percentage} className="h-2" />
                </div>
                <div className="w-16 text-sm text-gray-400 text-right">
                  {item.streams}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UsersSection({ toggleDropdown, dropdownOpen }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">User Management</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <FaFilter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <FaPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>
            Latest user registrations and activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-white">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.plan === 'Premium'
                          ? 'default'
                          : user.plan === 'Family'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{user.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-300 hover:text-white hover:bg-gray-700"
                          onClick={() => toggleDropdown(`user-${user.id}`)}
                        >
                          <FaEllipsisH className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      {dropdownOpen[`user-${user.id}`] && (
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400">
                            Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      )}
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function TracksSection({ toggleDropdown, dropdownOpen }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Track Management</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <FaFilter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <FaPlus className="w-4 h-4 mr-2" />
            Upload Track
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tracks</CardTitle>
          <CardDescription>Manage your music library</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Track</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Plays</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTracks.map((track) => (
                <TableRow key={track.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                        <FaMusic className="w-4 h-4 text-gray-300" />
                      </div>
                      <span className="font-medium text-white">
                        {track.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {track.artist}
                  </TableCell>
                  <TableCell className="text-gray-300">{track.album}</TableCell>
                  <TableCell className="text-gray-300">{track.plays}</TableCell>
                  <TableCell className="text-gray-300">
                    {track.duration}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-300 hover:text-white hover:bg-gray-700"
                          onClick={() => toggleDropdown(`track-${track.id}`)}
                        >
                          <FaEllipsisH className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      {dropdownOpen[`track-${track.id}`] && (
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Track</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400">
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      )}
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function PlaylistsSection({ toggleDropdown, dropdownOpen }) {
  const playlists = [
    {
      name: "Today's Top Hits",
      tracks: 50,
      followers: '2.1M',
      updated: '2 hours ago'
    },
    {
      name: 'Chill Vibes',
      tracks: 75,
      followers: '890K',
      updated: '1 day ago'
    },
    {
      name: 'Workout Mix',
      tracks: 45,
      followers: '1.2M',
      updated: '3 days ago'
    },
    {
      name: 'Indie Favorites',
      tracks: 60,
      followers: '650K',
      updated: '1 week ago'
    },
    {
      name: 'Jazz Classics',
      tracks: 80,
      followers: '420K',
      updated: '2 days ago'
    },
    {
      name: 'Electronic Beats',
      tracks: 55,
      followers: '780K',
      updated: '5 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Playlist Management
        </h2>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <FaPlus className="w-4 h-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{playlist.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={() => toggleDropdown(`playlist-${index}`)}
                    >
                      <FaEllipsisH className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  {dropdownOpen[`playlist-${index}`] && (
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Playlist</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Tracks</span>
                  <span className="text-white">{playlist.tracks}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Followers</span>
                  <span className="text-white">{playlist.followers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Updated</span>
                  <span className="text-white">{playlist.updated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PodcastsSection() {
  const podcasts = [
    {
      title: 'Tech Talk Daily',
      episodes: 245,
      subscribers: '125K',
      category: 'Technology'
    },
    {
      title: 'Music Matters',
      episodes: 180,
      subscribers: '89K',
      category: 'Music'
    },
    {
      title: 'Business Insights',
      episodes: 320,
      subscribers: '156K',
      category: 'Business'
    },
    {
      title: 'Health & Wellness',
      episodes: 95,
      subscribers: '67K',
      category: 'Health'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Podcast Management</h2>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <FaPlus className="w-4 h-4 mr-2" />
          Add Podcast
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">{podcast.title}</CardTitle>
              <CardDescription>{podcast.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Episodes</span>
                  <span className="text-white">{podcast.episodes}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subscribers</span>
                  <span className="text-white">{podcast.subscribers}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
            <CardDescription>
              Configure global platform settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">New User Registrations</p>
                <p className="text-sm text-gray-400">
                  Allow new users to register
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Content Moderation</p>
                <p className="text-sm text-gray-400">
                  Automatic content filtering
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Active
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Analytics Tracking</p>
                <p className="text-sm text-gray-400">User behavior analytics</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Enabled
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Manage API keys and integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Spotify Web API Key
              </label>
              <Input type="password" placeholder="••••••••••••••••" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Analytics API Key
              </label>
              <Input type="password" placeholder="••••••••••••••••" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Update Keys
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
