---
title: Blockchain-Based C2s Being Popularized
description: Exploring the rise of immutable C2 servers using public blockchains.
date: March 25, 2026
draft: true
---
<h3>What is a C2?</h3>
<p>C2 is short for command and control. Its the communication channel that an attackers uses to talk to their malware once they have an initial foothold on victim machines. You can think of it as the way to "phone home", or the link between the attacker and the software. This program communicating back to the attacker is usually referred to as a first-stage payload. They usually make their way onto machines by methods like clickfixes, phishing, trojans disguised as video game cheats or cracked programs, and much more.</p>

<p>Traditionally, the most common way to utilize C2s was by their own controlled server (usually something bullet-proof, offshore, paid for in cryptocurrency). They then setup reverse proxies and redirecting hosts, configure a web server, and take advantage of open source C2 frameworks like Sliver if they don't have something custom spun up. It's also entirely possible for attackers to make use of past compromised machines by turning them into a C2 itself, or becoming a hop in the path to it. Once the server is ready, malware can begin beaconing, or sending periodic requests to check for updates pushed by the actor.</p>

<h2>Path to the C2: Dead Drop Resolvers and Redirects </h2>



<h2>Common Communication</h2>
<p>A typical interaction between malware and the C2 may look something like this:
<pre><code>Malware → GET server/victimID → C2 server

C2 server → command or empty response if no update</code></pre>
A simple GET request is made over HTTP(s) to the IP of the C2 server. The victim ID architecture is very common as well. This ID is typically assigned dynamically per machine, to keep record of victims and communicate on a per-machine basis if necessary. It may use a HWID, UserProfile, Hostname, or other metrics - sometimes hashed together as well to ensure unique values in bigger campaigns. The command returned can be to download newly added files (i.e ransomware deployment), exfiltrate data, or change the current setup to evade detection or add further persistence. 

<h2>BlockChain</h2>





Examples:
Wordpress plugins package bought and c2 used eth explorer
glassworm
apts
