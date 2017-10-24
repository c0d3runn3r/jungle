# Jungle
A game for AI

## Documentation
## Classes

<dl>
<dt><a href="#Jungle">Jungle</a></dt>
<dd><p>Jungle</p>
<p>Land of fear and dreams</p>
</dd>
<dt><a href="#JungleClient">JungleClient</a></dt>
<dd><p>Jungle Client</p>
<p>Connects to a Jungle game server</p>
</dd>
<dt><a href="#JungleServer">JungleServer</a></dt>
<dd><p>Jungle Server</p>
<p>Defines a Jungle game server</p>
</dd>
<dt><a href="#Player">Player</a></dt>
<dd><p>Player</p>
<p>Base class for all players in the Jungle</p>
</dd>
<dt><a href="#Request">Request</a></dt>
<dd><p>REST style request</p>
</dd>
</dl>

<a name="Jungle"></a>

## Jungle
Jungle

Land of fear and dreams

**Kind**: global class  

* [Jungle](#Jungle)
    * [new Jungle(opts)](#new_Jungle_new)
    * [.players](#Jungle+players) ⇒ <code>array</code>
    * [.random_name()](#Jungle+random_name) ⇒ <code>string</code>
    * [.get_player_by_id(id)](#Jungle+get_player_by_id) ⇒ [<code>Player</code>](#Player)
    * [.add_player(player)](#Jungle+add_player)
    * [.delete_player(player)](#Jungle+delete_player)

<a name="new_Jungle_new"></a>

### new Jungle(opts)
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opts | <code>object</code> |  | options |
| [opts.address] | <code>string</code> | <code>&quot;\&quot;127.0.0.1\&quot;&quot;</code> | IP address |
| [opts.port] | <code>number</code> | <code>50000</code> | IP port |
| [opts.logger] | <code>object</code> |  | logger object containing methods for info, warn, and error |

<a name="Jungle+players"></a>

### jungle.players ⇒ <code>array</code>
Players getter

**Kind**: instance property of [<code>Jungle</code>](#Jungle)  
**Returns**: <code>array</code> - an array of all players in the game  
<a name="Jungle+random_name"></a>

### jungle.random_name() ⇒ <code>string</code>
Get a random name

**Kind**: instance method of [<code>Jungle</code>](#Jungle)  
**Returns**: <code>string</code> - name a random animal name  
<a name="Jungle+get_player_by_id"></a>

### jungle.get_player_by_id(id) ⇒ [<code>Player</code>](#Player)
Get player

Find a player by ID

**Kind**: instance method of [<code>Jungle</code>](#Jungle)  
**Returns**: [<code>Player</code>](#Player) - or null if not found  

| Param | Type |
| --- | --- |
| id | <code>object</code> | 

<a name="Jungle+add_player"></a>

### jungle.add_player(player)
Add a new player

**Kind**: instance method of [<code>Jungle</code>](#Jungle)  

| Param | Type | Description |
| --- | --- | --- |
| player | [<code>Player</code>](#Player) | the player to add |

<a name="Jungle+delete_player"></a>

### jungle.delete_player(player)
Remove a player

**Kind**: instance method of [<code>Jungle</code>](#Jungle)  

| Param | Type | Description |
| --- | --- | --- |
| player | [<code>Player</code>](#Player) | the player to remove |

<a name="JungleClient"></a>

## JungleClient
Jungle Client

Connects to a Jungle game server

**Kind**: global class  

* [JungleClient](#JungleClient)
    * [new JungleClient(opts, our)](#new_JungleClient_new)
    * [.connect()](#JungleClient+connect) ⇒ <code>Promise</code>

<a name="new_JungleClient_new"></a>

### new JungleClient(opts, our)
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opts | <code>object</code> |  | options |
| [opts.address] | <code>string</code> | <code>&quot;\&quot;127.0.0.1\&quot;&quot;</code> | IP address |
| [opts.port] | <code>number</code> | <code>50000</code> | IP port |
| [opts.logger] | <code>object</code> |  | logger object containing methods for info, warn, and error |
| our | [<code>Player</code>](#Player) |  | player |

<a name="JungleClient+connect"></a>

### jungleClient.connect() ⇒ <code>Promise</code>
Connect to server

**Kind**: instance method of [<code>JungleClient</code>](#JungleClient)  
**Returns**: <code>Promise</code> - promise resolved when we are connected and set up (name sent, etc)  
<a name="JungleServer"></a>

## JungleServer
Jungle Server

Defines a Jungle game server

**Kind**: global class  

* [JungleServer](#JungleServer)
    * [new JungleServer(opts)](#new_JungleServer_new)
    * [._handle_request(request, sock)](#JungleServer+_handle_request) ⇒ <code>object</code>
    * [.start([listen])](#JungleServer+start) ⇒ <code>Promise</code>
    * [.end()](#JungleServer+end)
    * [.runloop(func)](#JungleServer+runloop)
    * [._runloop()](#JungleServer+_runloop)

<a name="new_JungleServer_new"></a>

### new JungleServer(opts)
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opts | <code>object</code> |  | options |
| [opts.address] | <code>string</code> | <code>&quot;\&quot;127.0.0.1\&quot;&quot;</code> | IP address |
| [opts.port] | <code>number</code> | <code>50000</code> | IP port |
| [opts.logger] | <code>object</code> |  | logger object containing methods for info, warn, and error |

<a name="JungleServer+_handle_request"></a>

### jungleServer._handle_request(request, sock) ⇒ <code>object</code>
Handle an incoming request

**Kind**: instance method of [<code>JungleServer</code>](#JungleServer)  
**Returns**: <code>object</code> - reply  

| Param | Type | Description |
| --- | --- | --- |
| request | [<code>Request</code>](#Request) | object |
| sock | <code>socket</code> | the socket that sent the request |

<a name="JungleServer+start"></a>

### jungleServer.start([listen]) ⇒ <code>Promise</code>
Start

Start the game, begin listening for incoming connections

**Kind**: instance method of [<code>JungleServer</code>](#JungleServer)  
**Returns**: <code>Promise</code> - resolved when we are done starting  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [listen] | <code>boolean</code> | <code>true</code> | listen for incoming connections |

<a name="JungleServer+end"></a>

### jungleServer.end()
End

Ends the server and game

**Kind**: instance method of [<code>JungleServer</code>](#JungleServer)  
<a name="JungleServer+runloop"></a>

### jungleServer.runloop(func)
Set runloop

Sets a runloop function

**Kind**: instance method of [<code>JungleServer</code>](#JungleServer)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the function to call every runloop.  func will be passed elapsed time and this |

<a name="JungleServer+_runloop"></a>

### jungleServer._runloop()
Runloop

**Kind**: instance method of [<code>JungleServer</code>](#JungleServer)  
<a name="Player"></a>

## Player
Player

Base class for all players in the Jungle

**Kind**: global class  

* [Player](#Player)
    * [new Player(name, id, [sock])](#new_Player_new)
    * [.state](#Player+state) ⇒ <code>string</code>
    * [.state](#Player+state)
    * [.get_velocity()](#Player+get_velocity) ⇒ <code>Victor</code>
    * [.set_velocity(v)](#Player+set_velocity)
    * [.get_position()](#Player+get_position) ⇒ <code>Victor</code>
    * [.set_position(p)](#Player+set_position)
    * ["move"](#Player+event_move)

<a name="new_Player_new"></a>

### new Player(name, id, [sock])
Constructor

**Throws**:

- <code>Error</code> 


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | the name of our new player |
| id | <code>object</code> |  | something unique to use as an identifier |
| [sock] | <code>object</code> | <code></code> | an optional place to store a socket handle |

<a name="Player+state"></a>

### player.state ⇒ <code>string</code>
State getter

**Kind**: instance property of [<code>Player</code>](#Player)  
**Returns**: <code>string</code> - state  
<a name="Player+state"></a>

### player.state
State setter

**Kind**: instance property of [<code>Player</code>](#Player)  
**Throws**:

- Error


| Param | Type | Description |
| --- | --- | --- |
| new_state | <code>string</code> | the new state, one of "inactive", "active", "dead" |

<a name="Player+get_velocity"></a>

### player.get_velocity() ⇒ <code>Victor</code>
Velocity getter

We use get_ and set_ instead of native getters and setters because it is more clear what is going on

**Kind**: instance method of [<code>Player</code>](#Player)  
**Returns**: <code>Victor</code> - velocity  
<a name="Player+set_velocity"></a>

### player.set_velocity(v)
Velocity setter

**Kind**: instance method of [<code>Player</code>](#Player)  

| Param | Type |
| --- | --- |
| v | <code>Victor</code> | 

<a name="Player+get_position"></a>

### player.get_position() ⇒ <code>Victor</code>
Position getter

**Kind**: instance method of [<code>Player</code>](#Player)  
**Returns**: <code>Victor</code> - position  
<a name="Player+set_position"></a>

### player.set_position(p)
Position setter

**Kind**: instance method of [<code>Player</code>](#Player)  
**Emits**: [<code>move</code>](#Player+event_move)  

| Param | Type |
| --- | --- |
| p | <code>Victor</code> | 

<a name="Player+event_move"></a>

### "move"
Player move event

**Kind**: event emitted by [<code>Player</code>](#Player)  
<a name="Request"></a>

## Request
REST style request

**Kind**: global class  
<a name="new_Request_new"></a>

### new Request(type, path, [data])
Constructor

Create a new Request


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | one of GET, POST, PUT, DELETE |
| path | <code>string</code> |  | like "/items/45" |
| [data] | <code>object</code> | <code>{}</code> |  |


## TODO