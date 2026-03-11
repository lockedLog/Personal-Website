---
title: "Recovering Funds Through John The Ripper"
description: "How I regained access to an old Monero wallet by cracking the hash of the keys file with John The Ripper."
date: "November 9, 2025"
---

<p>Monero, or $XMR, has been gaining some popularity recently in the cryptocurrency space. This comes after somewhat of a privacy sentiment increase. Zcash, a rather dead and abandoned project for nearly the past decade, got some revisions and was pumped by a group of individuals, using the new shielding technology as the root of its discussion and value. However, if you want true privacy, the answer is Monero. So, soon after the Zcash explosion (running from sub $100 to over $700), XMR received its much deserved increase in attention. I remembered I had an old Monero GUI wallet on a laptop of mine and thought it would be a good time to see if I still had any. I knew this wallet probably had very little left as I had forgotten about it, but I figured I'd check.</p>

      <p>What I came to realize was that I had actually forgotten the password to log into the Monero GUI software. Without it, I could not easily get access to the funds. However, after looking into it, the GUI stores a .keys file in a Monero directory it creates, holding encrypted information about the wallet that it ultimately uses to validate itself in the GUI. All of this information and metadata is encrypted by the password I set and had forgotten.</p>

      <p>After some more research, I stumbled upon a method that could help me recover the wallet. It had to do with a tool I had used in the past, John the Ripper. I have used this tool to brute force hashes and whatnot before in-class labs and CTFs, but never what I would qualify as practical. This was the time to do so.</p>

      <h3>Step 1</h3>
      <p>Backup the .keys file just in case. Create a directory for this recovery (wallet_recover). I transferred the source for Monero2John into a file I created called recover.py.</p>
      
      <img src="/research/images/john1.jpg" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="Directory created" />

      <p>I prepared Candidates.txt, which is a list of password generalizations that I thought could be based on what I have used for other stuff like this. However, my passwords usually have random numbers and/or symbols appended if I am repeating them even if it's just for something local like this wallet. This will be used in a couple steps.</p>
      
      <img src="/research/images/John2.jpg" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="Candidates.txt explanation" />

      <h3>Step 2</h3>
      <p>Next I simply ran the recover.py script (Monero2John), which got the hash for me. Now I have the hash of the password, and need to crack it.</p>
      <img src="/research/images/John3.jpg" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="Recover.py script" />

      <h3>Step 3</h3>
      <p>I made use of the candidates.txt file I previously mentioned, hoping it would be related to one of those and make the process much quicker. I expanded the candidates file by running it through a short bash script that added trailing combinations of things like exclamation marks, question marks, pound symbols, dollar signs, and numbers.</p>

      <p>The password was found from the hash using the curated and permuted list of passwords I put together.</p>
      <img src="/research/images/John4.jpg" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="Password found" />

      <h3>Step 4</h3>
      <p>Finally, I was able to use this password to sign back into the Monero GUI wallet successfully, collecting a whopping 0.125 Monero (~ $50 at the time of writing), and sending it off to a wallet I control.</p>
      <img src="/research/images/John5.jpg" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="Monero recovered" />

      <p>Overall, I was both happy to recover some forgotten funds and use John the Ripper in a practical way, something I couldn't really say before. I found it to be an excellent learning experience and rewarding in multiple ways.</p>
