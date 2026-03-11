---
title: "Stateful UDP: QUIC"
description: "Researching the L4 protocol QUIC — why it was created, how it works, and what it accomplishes."
date: "January 15, 2026"
---

<p>The other day I heard of a protocol mentioned that I never had before. It was a transport, or L4 protocol. After some research, I found out that it was actually created by Google and has been around for a lot longer than I had expected after never hearing about it before. Everyone learns about the basics of TCP and UDP as the pillars of the transport layer, but what about QUIC? The podcast I heard it on was one that I have been listening to a lot recently focused on networking. I find it to be a unique dynamic, as it is hosted by Ethan Banks, a long-time network engineer, and a fresh college graduate Molly Metlitzky. Obviously, the podcasts are planned and written ahead of time and not on a whim, but they feel pretty authentic and are super educational. The name of the podcast is “N is for Networking.” <a href="https://packetpushers.net/podcast/n-is-for-networking/" target="_blank">https://packetpushers.net/podcast/n-is-for-networking/</a></p>

      <p>After digging into QUIC fundamentals a little bit, I realized that I should probably simultaneously learn more about HTTP/3 since they are usually a package deal with web. This is because for all web traffic, HTTP/3 is built on QUIC. HTTP version 3 being the most modern version of the Hypertext Transfer Protocol. While both HTTP/1.1 and HTTP/2 use TCP, HTTP/3 was created with QUIC specifically in mind.</p>

      <p>However, it is definitely important to make the distinction that QUIC can, in fact, work without HTTP/3; it just wouldn't be on the web side of things. Although from my research this appears to be where most of the QUIC adoption has been over the years.</p>

      <p>To begin, the first comparison or short explanation of QUIC that I found was that it was essentially a wrapped UDP protocol. It utilizes UDP, the quicker of the two major players, but has some important addons to make up for the things it lacks by not being TCP. One reason for this is the elimination of the three-way handshake. TCP takes the time to initialize a connection from server to host by a SYN, SYN-ACK, and ACK three-way handshake. That's three trips that no longer need to be taken when using QUIC since it runs over UDP.</p>
      
      <img src="/research/images/QUIC1.png" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="TCP vs QUIC" />

      <p>The reason for building on UDP doesn’t stem strictly from the performance benefits however. It appears that a major reason for this as well is the ossification (flexibility with middleboxes) and deployability when using UDP vs TCP. When you are using TCP, hardware like firewalls and load balancers will analyze the traffic. If that physical device is not prepared for a specific TCP function being used in the packet, then it could definitely cause some trouble, likely ending up in it being dropped. With UDP, this is not as much of a worry. That's because UDP is generally disregarded by these devices when it comes to deep analysis.</p>

      <p>The actual reason that QUIC was innovated is fascinating as well, and helped me to understand more about some L4 troubles in general. The problem it was created to solve stems from the lack of efficiency of TCP. HTTP/2 multiplexes streams of data over a singular TCP connection. If one packet from that stream is lost in transmission, it ends up drastically slowing down all the requests. This is formally referred to as “head-of-line blocking”.</p>

      <p>With this TCP pitfall in mind, QUIC was developed to multiplex streams individually at the transport layer. This would allow for packets to be lost in one stream without affecting the others. Somewhere this could cause a noticeable difference is on modern websites where multiple components are being loaded at once using HTTP/3.</p>

      <p>QUIC passes through a number of parameters similar to those of TCP options, such as the max transmission size and the source connection ID. The source connection ID is actually unique to QUIC. It’s extremely helpful because it allows your connection to persist despite movement between networks. So if you walk outside of your house’s Wi-Fi coverage and are on LTE, your connection will remain through QUIC despite the underlying migration. Both sides of the transmission use this ID to maintain the connection.</p>

      <p>QUIC is a stateful protocol: This means that both sides hold onto the information from a conversation. This is especially useful and needed for things like Connection IDs (CIDs), which are stored in the packet headers and are used to preserve the connection while changing networks. So, practically speaking, this would be something like me connecting to YouTube. I am on my home Wi-Fi, but then decide I need to walk out to the mailbox. On the way out (still watching my video), I go outside of the area my home Wi-Fi covers. My network connection then switches to LTE cellular. Even so, with QUIC being stateful and having a stored CID, the connection will migrate without needing to be re-established. The video should continue to buffer and normally (at the new speed of whatever the connection is) load for the user.</p>

      <p>The big question I had next was, “if QUIC passes through parameters like the CID, wouldn’t this cause the same issues as TCP functions for middleboxes”? The answer is no. As it turns out, QUIC also encrypts all this information before it passes through, whereas the TCP functions are in plaintext. It is encapsulated in the UDP payload, allowing for ease of passage. Only select information is disclosed for the box to see, such as the packet length and a QUIC pattern identifier.</p>

      <p>QUIC 0-RTT – no round trips needed in this version of QUIC. The first request sent from host to server is the request itself (HTTP/3). Things like TLS 1.3 and loss recovery are built in. QUIC comes right out of the gate with a larger initial packet rather than a small one like in the first part of the TCP handshake. All handshake-like communication as well as the actual payload is sent right from the start.</p>
      
      <img src="/research/images/QUIC2.png" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="0-RTT details" />

      <p>There are a few negatives to note about the 0-RTT version as explained by Cloudflare in the blog below. One is the replayability of requests. If an attacker was to successfully intercept that first transmission of the QUIC HTTP request from the client to the server, they can just send the same request again and again. The example they provided was a banking app, where the user makes a request to withdraw money, and it is intercepted. The attacker can then repeatedly send that post request that utilized 0-RTT to drain the account. Although in my opinion this specific example is highly unlikely for a multitude of reasons, it’s definitely something to keep in mind.</p>

      <p>In short, QUIC combines the speed of UDP with the reliability, encryption, and connection management features traditionally associated with TCP. Its statefulness and connection IDs enable modern web experiences, seamless network transitions, and faster connections overall.</p>

      <p><em>“Most packets make it, so why ACK everything?” – ThePrimeagen</em></p>

      <h3>References</h3>
      <ul>
        <li><a href="https://blog.apnic.net/2023/09/25/why-http-3-is-eating-the-world/" target="_blank">https://blog.apnic.net/2023/09/25/why-http-3-is-eating-the-world/</a></li>
        <li><a href="https://www.youtube.com/watch?v=-jlYeQ3hOhY" target="_blank">https://www.youtube.com/watch?v=-jlYeQ3hOhY</a></li>
        <li><a href="https://www.youtube.com/watch?v=VONSx_ftkz8" target="_blank">https://www.youtube.com/watch?v=VONSx_ftkz8</a></li>
        <li><a href="https://blog.cloudflare.com/even-faster-connection-establishment-with-quic-0-rtt-resumption/" target="_blank">https://blog.cloudflare.com/even-faster-connection-establishment-with-quic-0-rtt-resumption/</a></li>
        <li><a href="https://www.youtube.com/watch?v=UMwQjFzTQXw&list=LL&index=3" target="_blank">https://www.youtube.com/watch?v=UMwQjFzTQXw&amp;list=LL&amp;index=3</a></li>
        <li><a href="https://www.youtube.com/watch?v=fHBUOlvS3ts&list=LL&index=5" target="_blank">https://www.youtube.com/watch?v=fHBUOlvS3ts&amp;list=LL&amp;index=5</a></li>
        <li><a href="https://www.youtube.com/watch?v=HnDsMehSSY4&list=LL&index=6" target="_blank">https://www.youtube.com/watch?v=HnDsMehSSY4&amp;list=LL&amp;index=6</a></li>
      </ul>
