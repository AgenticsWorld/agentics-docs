---
title: Chat commands
description: Send /clear, /auto, /stop or /retry in the console chat or in Feishu to reset a session, switch auto-run, stop tasks or change the retry count without opening settings.
tags: [automation, beginner, reference]
order: 80
---

# Chat commands

Send a message that starts with `/` in the console chat, or in Feishu, WeChat or WhatsApp, to reset a session, switch auto-run on or off, stop tasks or change the retry count without opening the settings menu.

The system handles these commands itself. It does not dispatch them to an agent, and they use no engine quota, so they keep working when an engine has run out of quota or an agent is stuck.

## All commands

| Command | What it does | Applies to | Same as in the console |
| --- | --- | --- | --- |
| `/clear` | Clears the agent's session, so the next message starts a new one | This agent, current project | — |
| `/auto` | Shows whether auto-run is on for the current project | Current project | **🤖** button in the Run Panel |
| `/auto on`, `/auto off` | Turns auto-run on or off for the current project | Current project | **🤖** button in the Run Panel |
| `/auto off all` | Turns auto-run off for every project | All projects | — |
| `/stop` | Shows how many tasks are running or queued | All projects | — |
| `/stop all` | Stops every running and queued task | All projects | **⏹ Stop** in the Run Panel |
| `/retry` | Shows the current retry count | Global | **⚙️ → Advanced → Agent Advanced Settings → Retry count** |
| `/retry N` | Sets the retry count to N (0–10) | Global | Same as above |

- `/auto`, `/stop` and `/retry` are not case-sensitive, so `/AUTO ON` works too. `/clear` must be sent exactly as written, with nothing after it.
- If an argument is wrong (for example `/auto yes` or `/retry abc`), the reply says the command was not recognized and shows the usage. Nothing is changed.
- Any other text that starts with `/` is not a system command. It is sent to the agent as an ordinary message.

## In the console

1. Pick an agent in the left column. Commands work in every agent's chat, including the Reviser.
2. Type the command in the input box and press Enter or click **Send**.
3. The command and the system's reply both appear in that agent's chat.

Good to know:

- The **current project** is the one selected in the top bar. Commands like `/auto on` act on that project.
- Sending a command with Ctrl+Enter (the shortcut that adds a message to the running task) works the same as Enter. The command is not added to a running task.
- If you send a command in the **Workflow Orchestrator** chat, the reply is also pushed to your linked mobile channels. Replies to commands sent to other agents stay in the console.

## In Feishu

### Set up Feishu

1. Create an app on the [Feishu Open Platform](https://open.feishu.cn/app) (or Lark) and turn on its bot capability.
2. In the app's event and callback settings:
   - Set event subscriptions to the long-connection mode and subscribe to **Receive messages** (`im.message.receive_v1`).
   - Set callback subscriptions to the long-connection mode as well. The buttons on confirmation and sign-off cards need it.
3. Grant the `im:message` permission. To also receive images and videos, grant `im:resource`.
4. In the console, open **⚙️ → Advanced → Mobile Messages**. In the **✈️ Feishu** section, enter the App ID and App Secret, pick the platform (Feishu or Lark) and click **Verify & link**. The machine running the service needs the Feishu SDK: `pip install lark-oapi`.
5. In Feishu, search for your app's name and send the bot any message. The system can only push replies to you after it has received a message from you.

### Send commands

Send the command in your one-on-one chat with the bot, for example `/retry 1` or `/stop all`.

- Only text in one-on-one chats is passed on. Group chats, images and rich text are not.
- Messages from Feishu always go to the **Workflow Orchestrator**, in the project selected in the console's top bar (or the first project if none is selected). So `/clear` sent from Feishu clears the Workflow Orchestrator's session in that project, and `/auto on` turns on auto-run for that project. To work on another project, switch it in the console's top bar first.
- The reply is pushed back to Feishu and starts with "🎬 总制片 · *project name*" (this label is in Chinese). A message longer than 3,000 characters is cut off; read the full text in the console.
- Commands you send from Feishu and their replies also appear in the Workflow Orchestrator's chat in the console, marked "✈️ From Feishu".

### Other things Feishu does

- **Confirmation and sign-off cards.** When an agent asks you to confirm something (for example, retry or skip) or a step needs your sign-off, a card is pushed to Feishu. Click a button on the card to answer; it is the same answer as in the console's dialog. On a confirmation card the highlighted button is the default, which is chosen if nobody answers before the countdown ends. Sign-off cards do not time out. Once answered, the card changes to a finished state and its buttons go away.
- **Media pushes.** Newly finished character, scene and prop images and storyboard group videos are pushed to Feishu automatically. Files over the size limit (5 MB by default; set 1–30 MB under **File size limit** on the Mobile Messages page) are not sent; you get a short text notice instead.
- **System notices.** Settings changes, auto-run wake-ups and other system messages are pushed to Feishu too.

### WeChat and WhatsApp

After you link WeChat ClawBot or WhatsApp under **⚙️ → Advanced → Mobile Messages**, commands work the same way as in Feishu: messages go to the Workflow Orchestrator and act on the project selected in the console's top bar. WhatsApp only reads text from your "Message yourself" chat. With WeChat, you also need to send one message first before the system can push to you.

## Command details

### `/clear`: reset a session

Clears the current agent's sessions for every engine in the current project, so the next message starts a new session.

- Use it when a session has grown so long that resuming it fails (the request is too large and the network drops it), or when you want the agent to drop old context and read the project files afresh.
- Old sessions are only no longer resumed. The engine's own session files are not deleted, and the chat history in the console stays.
- If the agent still has a running or queued task, that task records its session again when it finishes. The reply reminds you to send `/clear` again after the task ends.

### `/auto`: auto-run

With auto-run on, the system checks the project after each idle period. If the workflow still has work that can be done, no task is running and no confirmation is waiting for you, it wakes the Workflow Orchestrator to dispatch more work. If only sign-offs are left, it sends you a desktop notification instead.

- `/auto` shows whether auto-run is on for the current project, plus the idle time (5 minutes by default) and the usage threshold (80% by default). When the session usage of the Workflow Orchestrator's engine reaches the threshold, that round does not wake it. Change both under **⚙️ → Auto-Run**.
- `/auto on` and `/auto off` turn auto-run on or off for the current project.
- `/auto off all` turns it off for every project at once. There is no `/auto on all`.
- Each project has its own switch. It is off by default and stays as set after the service restarts.
- It is the same switch as the **🤖** button in the Run Panel. When a command changes it, the button in the web page updates right away.

### `/stop`: stop tasks

- `/stop` shows how many tasks are running and queued across all projects.
- `/stop all` stops every running and queued task in every project, the same as **⏹ Stop** in the Run Panel. The reply lists the agents that were stopped and their projects. Stopped tasks are recorded as stopped by the user, not as errors.
- This only stops the tasks that already exist. If auto-run is on for the current project, the system will dispatch work again once the project has been idle for a while, and the reply warns you about this. To stop for good, also send `/auto off` (or `/auto off all`).
- There is no command for stopping just one project or one agent.

### `/retry`: retry count

The retry count is how many times agents may redo work on their own. That covers sending work back with notes after a failed review or score, regenerating images and videos that fail the automatic checks, and regenerating work that fails an agent's own self-check.

- `/retry` shows the current retry count.
- `/retry N` sets it to N, from 0 to 10. The default is 0.
- 0 means no automatic retries: the first failure is handed to you, and agents do not redo the work on their own. In this case, a "retry or skip" confirmation that nobody answers before the countdown ends defaults to skip, so an unanswered question never leads to endless retries.
- It is a global setting for all projects, and the same setting as **⚙️ → Advanced → Agent Advanced Settings → Retry count**.
- A new count applies to tasks started from then on. Tasks that are already running or queued keep the old count, and the reply tells you when there are any.

::: tip
`/retry` is available from v1.0.44.
:::

## Reply language

Replies to `/stop` and `/retry` follow the console's interface language: Chinese for the Chinese interface, English for all others. Replies to `/clear` and `/auto` are currently in Chinese only.

## Troubleshooting

**I sent a command in Feishu and got no reply.**
Open **⚙️ → Advanced → Mobile Messages** and check **Messaging status** and **Last error** in the Feishu section. If it is still waiting for your first message, send the bot any message in Feishu. The service on your computer needs to be running.

**The command acted on the wrong project.**
Commands from Feishu, WeChat and WhatsApp act on the project selected in the console's top bar. Switch to the project you want there first, then send the command.

**I sent `/stop all`, and tasks started running again a little later.**
Auto-run is on for the current project. Send `/auto off` to turn it off.
