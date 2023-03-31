---
title: Host your own Tor exit / relay node
description: This article tells you how to host a Tor exit / relay node for onion service
date: 2023-03-31T01:53:31.694Z
tags:
  - Tor
  - Onion
  - TorProject
  - exitnode
  - Torrelay
  - Torrc
---
Tor, short for The Onion Router, is an anonymity network that enables users to browse the internet anonymously by encrypting their traffic and routing it through a series of nodes. These nodes can be run by anyone, and the final node, known as the exit node, is responsible for sending traffic back onto the regular internet. Running a Tor exit node is an important way to contribute to the privacy and freedom of the internet, but it requires some technical expertise and responsibility. In this blog post, we’ll walk you through the process of hosting a Tor exit node.

## S﻿tep 0: Consider before deploy
Here are some things to consider:

* Legal considerations: In some countries, hosting a Tor exit node is illegal, and you could face legal consequences for doing so. You should research the laws in your country and make sure that hosting a Tor exit node is legal before proceeding.
* Bandwidth and resource consumption: Tor exit nodes can consume a lot of bandwidth, and you will need to have a fast and reliable internet connection to handle the traffic. You may also need to pay for additional bandwidth if your hosting plan has a bandwidth cap.
* Technical expertise: Hosting a Tor exit node requires some technical expertise and experience with Linux administration. You will need to set up a server, install and configure Tor software, and maintain the node to ensure that it is running smoothly.
* Risks associated with illegal activity: As an exit node operator, you may be held responsible for any illegal activity that passes through your node. While Tor is designed to protect the anonymity of its users, it is not foolproof, and law enforcement agencies may be able to trace activity back to your node. 
* Reputation risk: Hosting a Tor exit node may attract unwanted attention and scrutiny from law enforcement agencies, as well as from your internet service provider and other organizations. It is important to consider the potential risks to your reputation before proceeding.

There are three types of Tor nodes that you can host: **middle/guard** nodes, **bridge** nodes, and **exit** nodes. Middle nodes are relays that help to route traffic between different nodes in the Tor network, but do not serve as the final node for traffic leaving the network. Bridge nodes are similar to middle nodes, but they are not publicly listed in the Tor directory, which can help users bypass censorship and surveillance. Exit nodes, on the other hand, are the final nodes for traffic leaving the Tor network and provide a gateway for users to access the regular internet anonymously. However, hosting an exit node comes with significant legal and ethical responsibilities, as exit nodes can be used to route traffic for illegal activities. The decision to host a Tor node, and what type of node to host, should be made after careful consideration of the risks and benefits, and in compliance with the Tor Project's guidelines and policies.

## Step 1: Choose a Location

The first step in hosting a Tor exit node is to choose a location for your server. You will want to choose a location with a fast and reliable internet connection, as well as a high bandwidth cap or an unlimited plan, since exit nodes can consume a lot of bandwidth. It’s also important to choose a location where Tor is legal and not blocked, as hosting an exit node in a country where Tor is not allowed can result in legal issues.

## Step 2: Set Up Your Server

Once you have chosen a location, you will need to set up a server. You can use a virtual private server (VPS) or a dedicated server, depending on your budget and needs. You will need to install a Linux operating system, such as Ubuntu or Debian, and configure it for use as a Tor exit node. The Tor Project provides detailed instructions for setting up a Tor exit node on Linux.

## Step 3: Install and Configure Tor

Next, you will need to install the Tor software and configure it for use as an exit node. You can install Tor using the package manager for your Linux distribution, or you can download and install it from the Tor Project’s website. Once installed, you will need to configure Tor to run as an exit node, which involves editing the Tor configuration file. The Tor Project provides detailed instructions for configuring Tor as an exit node.

Tor Project have handful documentation to help you going through installation: <https://community.torproject.org/onion-services/setup/install/>. 

I also found this video useful during setup: <https://www.youtube.com/watch?v=EMZqZ3XX8Eo>

For instance, on Debian/Ubuntu, you can simply run the command \`apt install tor\` to install the software, and then modify the configuration file located at \`/etc/tor/torrc\` using your preferred text editor. This resource can also be useful if you intend to set up a Tor relay. One thing to keep in mind is that if you plan on hosting an exit node, the setup provided in the tutorial will block all exit traffic. In this case, you may want to consider using the following configuration setup instead:

```shell
Exitpolicy accept *:443
Exitpolicy accept *:80
Exitpolicy reject *:*
ExitRelay 1
```

Additionally, to prevent abuse, it is recommended to avoid opening any email or other ports that may be susceptible to spam or misuse.

Example config:

```shell
ORPort 20308
Exitpolicy accept *:443
Exitpolicy accept *:80
Exitpolicy reject *:*
ExitRelay 1
Nickname yourtorrelaynickname
ContactInfo youremail@mail.com
IPv6Exit 1
```

Here is additional lines to set up obfs4 bridge:

```shell
ServerTransportPlugin obfs4 exec /usr/bin/obfs4proxy
ServerTransportListenAddr obfs4 0.0.0.0:40001
ExtORPort auto
```

R﻿ead more about obfs4 bridge setup on <https://community.torproject.org/relay/setup/bridge>

T﻿or Project has a wiki about how to host different types of relay nodes: <https://community.torproject.org/relay/setup/>

F﻿or exit node, it is required to setup your local dns resolver: 

Debian/Ubuntu

The following commands install unbound, backup your DNS configuration, and tell the system to use the local resolver:

```shell
apt install unbound
cp /etc/resolv.conf /etc/resolv.conf.backup
echo nameserver 127.0.0.1 > /etc/resolv.conf
```

To avoid unwanted configuration changed (for example by the DHCP client):

```
chattr +i /etc/resolv.conf
```

The Debian configuration ships with QNAME minimization (RFC7816) enabled by default, so you don't need to enable it explicitly. The Unbound resolver you just installed also does DNSSEC validation.

If you are running **systemd-resolved** with its stub listener, you may need to do a bit more than just that. Please refer to the [resolved.conf manpage](https://www.freedesktop.org/software/systemd/man/resolved.conf.html).

## Step 4: Test Your Exit Node

After you have configured Tor, you will want to test your exit node to make sure it is working properly. You can use the Tor Browser to test your exit node by connecting to a website and verifying that your IP address is listed as the exit node IP address. You can also use the Tor Metrics website to monitor the bandwidth usage and performance of your exit node.

T﻿o see if you exit node is running, check this bulk list: <https://check.torproject.org/torbulkexitlist>

## Step 5: Monitor Your Exit Node

Once your exit node is up and running, it’s important to monitor it to ensure that it is not being used for malicious purposes. The Tor Project provides a list of recommended monitoring tools and techniques, including using log analysis software to track the traffic passing through your exit node and monitoring the Tor Metrics website for unusual activity. It’s also a good idea to regularly check the Tor Project’s guidelines for running an exit node to make sure you are complying with their policies.

T﻿or Project also provides a helpful page for post-install and good practice: <https://community.torproject.org/relay/setup/post-install/>

Elsa node is an Tor exit node I am currently running, see:

<https://metrics.torproject.org/rs.html#search/elsa>

## Conclusion

Running a Tor exit node can be a rewarding way to contribute to the privacy and freedom of the internet, but it requires some technical expertise and responsibility. By following the steps outlined in this blog post, you can set up and run a Tor exit node that provides a valuable service to the Tor network while maintaining the security and privacy of both your server and its users.