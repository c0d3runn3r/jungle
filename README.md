# Jungle
A game for AI

## TODO

- Write simple client library
- Disallow clients from setting other players' velocity
- When I crash, my velocity goes to zero(?)
- Player <-> player collisions


## Documentation
## Classes

<dl>
<dt><a href="#Jungle">Jungle</a></dt>
<dd><p>Jungle</p>
<p>Land of fear and dreams</p>
</dd>
<dt><a href="#Player">Player</a></dt>
<dd><p>Player</p>
<p>Base class for all players in the Jungle</p>
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
    * [.get_player_by_sock(sock)](#Jungle+get_player_by_sock) ⇒ [<code>Player</code>](#Player)
    * [.add_player(player)](#Jungle+add_player)
    * [.delete_player(player)](#Jungle+delete_player)
    * [.start()](#Jungle+start)
    * [.end()](#Jungle+end)
    * [._runloop()](#Jungle+_runloop)
    * [.runloop(func)](#Jungle+runloop)

<a name="new_Jungle_new"></a>

### new Jungle(opts)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | options |

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

<a name="Jungle+get_player_by_sock"></a>

### jungle.get_player_by_sock(sock) ⇒ [<code>Player</code>](#Player)
Get player

Find a player by sock

**Kind**: instance method of [<code>Jungle</code>](#Jungle)  
**Returns**: [<code>Player</code>](#Player) - or null if not found  

| Param | Type |
| --- | --- |
| sock | <code>object</code> | 

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

<a name="Jungle+start"></a>

### jungle.start()
Start

Start the game runloop

**Kind**: instance method of [<code>Jungle</code>](#Jungle)  
<a name="Jungle+end"></a>

### jungle.end()
End

Ends the runloop

**Kind**: instance method of [<code>Jungle</code>](#Jungle)  
<a name="Jungle+_runloop"></a>

### jungle._runloop()
Runloop

**Kind**: instance method of [<code>Jungle</code>](#Jungle)  
<a name="Jungle+runloop"></a>

### jungle.runloop(func)
Set runloop

Sets a runloop function

**Kind**: instance method of [<code>Jungle</code>](#Jungle)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the function to call every runloop.  func will be passed elapsed time and this |

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

