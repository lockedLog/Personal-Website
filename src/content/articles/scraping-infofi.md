---
title: "Scraping InfoFI Website For a Researcher"
description: "How I successfully scraped 100,000 users' info on a web3 website, how it could be malicious, and how to prevent it using best practices."
date: "December 8, 2025"
---

<h3>Background</h3>
      <p>Someone who I have been following for a few years now, ZachXBT made an announcement on his telegram channel. He was paying money for people to scrape websites designed for the web3 space. Zach is a crypto sleuth of sorts, tracing funds origins and deobfuscating the trail to a real person’s identity. In my opinion his work is truly amazing and respectable, it’s why I follow him and keep up to date with his investigations.</p>
      
      <img src="/research/images/scrape1.png" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="ZachXBT announcement" />

      <p>Most of the sites were apparently already completed by the time I saw the messages. I am by no means an expert at scraping, but I thought I would look into it just for the fun of it, maybe learning something along the way. I took a very quick look at both platforms remaining, Kaito Yaps and Wallchain. I immediately decided to dive deeper into wallchain after seeing that Kaito needed a paid subscription (very overpriced as well by the way) to access a lot of their site. The parts I could use would not even let me successfully link an X account to login either. Since most of the requests I would need to look at were probably auth’d, I stopped pursuing it. On top of that, wallchain has absolutely zero forms of rate limit apparent while parsing pretty much every part of their website that I explored while digging into the requests. Big bonus when you are trying to scrape. This way you can go at whatever speed is most efficient, and there is less need for proxies, specifically rotating proxies which can sometimes be costly.</p>

      <p>So what does the site actually do? It appears that Wallchain aims to be a platform for influential figures on X to be paid out for promoting projects. They have a metric to measure a user’s weight and quality called mindshare. They also have an X score that ranks how influential they are overall using things like follower counts and engagement.</p>

      <h3>Approach</h3>
      <p>After just a few minutes of looking into the site I realized there was only one way (at least that I am aware of) to scrape users. They have a leaderboard system that shows top holders for projects. At the time of writing, the website has 22 projects up, with each one displaying the top 1000 users for multiple time frames. They all will show the last 7 days and last 30 days as options, and active projects will display “epoch” 1 and 2. The users on the boards will be different depending on the period selected, so I knew I should enumerate all of them, for every project. Each leaderboard was split into viewing by 50 pages of 20 names (the 1000 total). So here's the logic I came up with:</p>

      <ol>
        <li>Pull all ‘companies’ aka projects that are on the site currently. The endpoint I found most useful for this is ‘https://api.wallchain.xyz/voices/companies/cards’, it returns json data showing details for all of the companies on the website. I then pulled them and threw them in a list with this quick one-liner: <code>company_ids = [item["companyId"] for item in r.json()]</code></li>
        <li>Fetch the page for each company. For each company we will go through all possible time periods (30d, 7d, epoch1, epoch2). For each time doing THAT, we will do it once while in ascending order, and once while inversed, descending.</li>
        <img src="/research/images/scrape2.png" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="Code snippet" />
        <li>For each request made (will be per page), grab the 20 users’ data from the json response. Ensure that there are no duplicates per project.</li>
        <li>Append all data to a csv file nice and organized.</li>
      </ol>

      <p>There very well could be a more efficient and algorithmic way of accomplishing this more efficiently but I am no software engineer.</p>

      <p>These steps resulted in me collecting roughly 100,000 unique entries of users once I had figured out all the parameters that could be alternated to include a larger pool.</p>
      
      <img src="/research/images/scrape4.png" style="max-width: 100%; border-radius: 8px; margin: 1.5rem 0;" alt="Scraped entries snippet" />

      <p>A fun fact about the site that I discovered early on while messing with the code was that while you need to authenticate via X delegation/connection to manually do the actions resulting in the requests I used, the actual api calls themselves can be programmatically used with pretty much zero headers or auth at all. This, combined with absolutely zero rate limiting or captcha functionality, makes for pretty poor practice on the developers’ behalf.</p>

      <h3>Why this could pose somewhat of a threat to users</h3>
      <p>With everything accessible without being authenticated or rate limited, that makes it very easy for someone to repeatedly scrape the website all day long autonomously, adding new info as it appears. With all this data they could then set up malicious campaigns using things like phishing emails, or social engineering them on X/Twitter. The entire list of handles is of people that are obviously very interested and active in crypto, and probably hold some themselves. This kind of list is probably a good start for an attacker to use before picking a smaller subset of targets to do further recon on and put more effort into.</p>

      <p>I may throw this on my github at some point, although I am not sure at the moment. I doubt anyone with malicious intent and the time or energy would use it in an abusive way. I also did send this to ZachXBT on X, although I would be surprised if no one else has as well.</p>
