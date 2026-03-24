---
title: "Google's Anti-Spam Verification: Outbound OTP"
description: "Examining the benefits of outbound OTP over traditional inbound OTP."
date: "March 23, 2026"
---

<p>I have recently been researching and planning an email-based security project that I have great interest in. One of the first steps in actually building out the infrastructure needed and testing some things was going to be creating a dummy gmail account just to use temporarily so I didn't have to go through any emails I actually use. In the process, I found out that Google has made a move to a new verification system for creating accounts, or at least implement it if a risk level is found that maybe I tripped. So, I wanted to take a look at the benefits of such a system over the traditional OTP verification.</p>

<h3>The change:</h3>
<p>The last type of verification that I recall going through for any sort of google accounts was a text message with a code, a traditional inbound OTP (one time password) as the last step to fully create your google account and join their services. You would enter your name, dob, desired email, maybe some recovery info, and then enter your phone number to receive a verification code to finish. However, now instead of the last step being to enter your number and receive the code to verify, the user themselves will receive a QR code to scan on their mobile device. The QR code served on a URI like this:</p>

<p>
https://accounts.google.com/devicephoneverification/initiate?request_id={requestID}&hl=en&pnv_flow=2&dsh=S{session/stateToken}:{expirationCode}&tid={someSession/messageValueToken}&flow=browser&idv_origin=1<br>
sms://{short code number here}/&body=Send%20this%20message%20without%20editing.%20({verification code here})
</p>

<p>This then prompts the user to the SMS/Text app on their device where the message is already ready to send, the button simply needs to be clicked. This is sent to a short code number, not a traditional one. These are common for large businesses to make use of when operating at scale.</p>

<h3>So why is this better?</h3>
<p><strong>SIM vs VoIP</strong></p>
<p>For one, it cuts down on the use of VoiP number services for users that are much more likely to be illegitimate. This would include things like Google Voice numbers and temporary number services online (generally). With an inbound OTP, users can buy a number for less than a dollar, receive the code for it, and never have to use a real number. Obviously services that are rented for codes can not be utilized by customers to send an outgoing text. Google Voice on the other hand allows for outgoing texts and calls, however there is a caveat. That being the possibility that Google can detect the use of a VoIP number like this, I'd imagine it being even easier for them when it's their own service. This is typically done through metadata sent with the texts from the carrier, which include info like the device ID (IMEIs). This information could probably then be compared to that of the information collected in the parameters of the QR code URI, my guesses being either the tid or part of the requestID.</p>

<h3>Security threats during the process</h3>
<p>Another benefit of outbound verification over inbound OTP is the decrease in attack surface for obtaining access to victim accounts. One example of this would be creating a little bit of friction for attacks such as sim swaps.</p>

<p>A sim swap is when an attacker either bribes or social engineers a carrier representative, or otherwise gains access to internal tools to move someone's data to a sim they control, typically in a burner phone. They can then collect password reset codes to their phone number and login to most accounts associated with it. However in this case, the attacker would need the browser access to their session that is asking for the code, as well as a device that is in control of the associated sim card. When we take a look at how most actors carry out sim swaps, we can infer that this drastically decreases the chance of its effectiveness, since usually separate people are carrying out these different parts. A "holder", or mule, gets paid to hold the phone that the sim is swapped to and relay the codes to the main attackers who will scrape all email and account data and try to get into everything. If they need the QR code scanned from the browser session, and then the number to send the code tied to that session, it makes it much more difficult (especially when these sorts of attacks need to be carried out quickly to be effective, since the victim will lose cellular service and start suspecting something is up).</p>

<p>Another attack that is made less effective by outbound verification is cloned phishing pages. A popular social engineering attack is to get in contact with someone via a phone call, email, etc., and redirect them to a cloned website of whatever account is targeted. When they enter their details, the fake page will automatically redirect these credentials to the real thing in the background (or for the attacker to manually use). The ultimate goal is for the attacker to get every password or authentication code needed from the cloned website to fully login to their account on the actual platform. The approach for this becomes much harder when a session-bound device and number must reach out rather than merely receive a code.</p>

<p>It's important to note however, both of these and more are still possible threats when using the outbound code verification for users. It creates more friction between these attacks, not eliminates them. I believe that the number one cause of companies like Google using this in more and more spots is the anti-bot and spam measures, with some possible security benefits being an added bonus. There's also the potential for more data, and the confirmation of data, to be collected (which obviously companies like Google would love) from the session details and phone number/metadata together.</p>
