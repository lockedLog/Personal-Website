---
title: "Splunk Fundamentals"
description: "Initial notes on Splunk search syntax and getting comfortable with the environment."
date: "March 11, 2026"
note: "Learned basic SPL commands like stats, timechart, and dedup."
url: "https://docs.splunk.com/"
---

<h3>Getting Started with Splunk processing language (SPL)</h3>
<p>Splunk is an incredibly powerful platform for searching, monitoring, and analyzing machine-generated big data. I'm taking the time to learn the fundamentals of SPL so I can parse logs efficiently.</p>

<h3>Key Concepts</h3>
<ul>
  <li><strong>Pipelines:</strong> Like Unix pipelines, SPL strings commands together using the pipe <code>|</code> operator. The output of one command is the input for the next.</li>
  <li><strong>Fields:</strong> Splunk auto-extracts useful fields (like <code>host</code>, <code>source</code>, <code>sourcetype</code>, and basic key-value pairs) from incoming data parsing.</li>
</ul>

<h3>Important SPL Commands</h3>
<pre style="background: var(--bg2); padding: 1rem; border-radius: 8px; overflow-x: auto;"><code>index=main sourcetype=access_combined status=200
| stats count by clientip
| sort - count
| head 10</code></pre>

<h3>Learnings</h3>
<ul>
  <li>The time range picker is often the most important filter to limit the massive volume of search data.</li>
  <li>Using <code>stats</code> rather than <code>transaction</code> is generally more performant.</li>
</ul>
