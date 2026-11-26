---
title: Mobile messages
description: Link Feishu (Lark), WeChat ClawBot or WhatsApp to talk to the Workflow Orchestrator from your phone, get its replies and notices, and answer sign-off cards.
tags: [automation, how-to]
order: 85
---

# Mobile messages

Link a messaging app on your phone and you can follow a production and steer it while you are away from your computer. Messages you send reach the Workflow Orchestrator as if you had typed them in the console, and its replies and system notices come back to your phone.

Three channels are available: **✈️ Feishu** (or Lark), **💬 ClawBot WeChat** and **🟢 WhatsApp**. You can link any of them, or all three.

## Open Mobile Messages

Open **⚙️ → Advanced → Mobile Messages**. Each channel has its own card, showing whether it is linked and whether messages can flow.

![The Mobile Messages page with Feishu linked and connected, and WeChat and WhatsApp not linked yet; the linked contact is blurred](/images/videoagents/console/mobile-messages.webp)

## Link Feishu

Feishu connects through a Feishu app you create; no public web address is needed.

1. On the [Feishu Open Platform](https://open.feishu.cn/app) (or Lark), create an app with bot capability.
2. In the app's event and callback settings, use the long-connection mode, subscribe to **Receive messages** (`im.message.receive_v1`), and set callbacks to long-connection mode too (the buttons on confirmation and sign-off cards need it).
3. Grant the `im:message` permission. To receive images and videos, also grant `im:resource`.
4. On the Mobile Messages page, enter the **App ID** and **App Secret**, pick the **Platform** (Feishu or Lark) and click **Verify & link**.
5. In Feishu, search for your app's name and send the bot any message.

The system can push to you only after it has received your first message. Until then, **Messaging status** says it is waiting for it.

Once linked, the card shows:

| Field | What it does |
| --- | --- |
| **Messaging status** | **✓ Connected; two-way messaging is available**, or what it is waiting for |
| **Last error** | The last delivery problem, if any |
| **File size limit** | Images and videos larger than this are not pushed; you get a short text notice instead. 1–30 MB, default 5 MB. Feishu's own caps are 10 MB for images and 30 MB for videos. |
| **Unlink** | Removes the link; Feishu stops receiving messages |

If the card reports that the Feishu SDK failed to load, the service cannot use Feishu. The desktop app includes it, and a source install gets it with the core dependencies; if it is missing, install the `lark-oapi` package.

## Link WeChat ClawBot

1. Click **Generate linking QR code**.
2. Scan the code with WeChat and confirm.
3. When the card shows **✓ Linked successfully**, send the bot any message in WeChat.

As with Feishu, the system can only push to you after your first message. If the code expires, generate a new one.

## Link WhatsApp

VideoAgents connects as a linked device of your own WhatsApp account, like WhatsApp Web.

1. Click **Generate linking QR code**.
2. On your phone, open WhatsApp → **Settings** → **Linked devices** → **Link a device**, and scan the code.
3. Send commands in your **Message yourself** chat.

Only the "Message yourself" chat is used. Messages from other people are never read or relayed. **Unlink** logs out the linked device and deletes the local session.

## How messaging works

- **Messages go to the Workflow Orchestrator** of the project selected in the console's top bar. To work on another project, switch it in the console first.
- **Replies go to every linked channel.** System messages, such as settings changes and auto-run wake-ups, are pushed too. A message you send from one channel is mirrored to the others, so every endpoint sees the same conversation.
- **In the console**, your phone messages show in the Workflow Orchestrator's chat with **✈️ From Feishu**, **💬 From WeChat ClawBot** or **🟢 From WhatsApp**.
- **Text only.** Voice messages are handled as text when the app provides a transcript. Images and files you send are not relayed.
- **Commands work too.** `/auto`, `/stop`, `/retry` and `/clear` work from your phone. See [Chat commands](/videoagents/console/chat-commands).

### Extra features in Feishu

- **Confirmation and sign-off cards** are pushed as interactive cards. Click a button to answer; it is the same answer as in the console.
- **Finished images and videos** (new character, scene and prop images, and storyboard group videos) are pushed with captions, within the file size limit.

See [Chat commands](/videoagents/console/chat-commands#in-feishu) for the details of Feishu cards and replies.

## Troubleshooting

**I get no replies on my phone.** Check **Messaging status** on the channel's card. If it is waiting for your first message, send the bot (or your WhatsApp self-chat) any message. The service on your computer must be running.

**My message acted on the wrong project.** Messages act on the project selected in the console's top bar. Switch it there.

**Images are not pushed to Feishu.** Grant the app the `im:resource` permission, and check the **File size limit**.

## Related

- [Chat commands](/videoagents/console/chat-commands)
- [Auto run](/videoagents/console/auto-run)
- [Sign-off gates](/videoagents/concepts/sign-off-gates)
- [Security and LAN access](/videoagents/reference/security)
