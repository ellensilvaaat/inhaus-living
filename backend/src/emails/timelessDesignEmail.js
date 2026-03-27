export const timelessDesignEmail = (firstName = "", email = "") => `
<div style="
background:#f1f0ee;
padding:70px 0;
font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="640" style="
background:#ffffff;
border-radius:18px;
overflow:hidden;
box-shadow:0 30px 60px rgba(0,0,0,0.12);
">

<!-- HEADER -->
<tr>
<td style="
background:linear-gradient(135deg,#000000,#2a2a2a);
padding:55px;
text-align:center;
">

<img 
src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(4).png"
width="185"
style="display:block;margin:auto"
/>

</td>
</tr>

<!-- HERO IMAGE -->
<tr>
<td>
<img
src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
width="100%"
style="display:block;border:none"
/>
</td>
</tr>

<!-- CONTENT -->
<tr>
<td style="
padding:70px 70px 50px 70px;
color:#333;
">

<h1 style="
font-size:30px;
margin-bottom:28px;
letter-spacing:-0.4px;
font-weight:600;
color:#1a1a1a;
">
Design Choices That Stand the Test of Time
</h1>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:22px;
">
Not all design trends are created equal.
</p>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:24px;
">
While some choices add long-term value to a home, others fade quickly and can impact both functionality and resale potential.
</p>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:18px;
">
At <strong>Inhaus Living</strong>, we guide our clients toward design decisions that stand the test of time, including:
</p>

<ul style="
padding-left:20px;
color:#444;
font-size:15px;
line-height:2;
margin-bottom:28px;
">

<li>Natural and enduring materials</li>
<li>Timeless layouts that support everyday living</li>
<li>Smart storage and functional spaces</li>

</ul>

<div style="
height:1px;
background:#eeeeee;
margin:40px 0;
"></div>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:24px;
">
And we help homeowners avoid short-lived trends and impractical design fads that can date a home within just a few years.
</p>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:30px;
">
Our focus is always the same: creating homes that feel beautiful today and remain relevant for years to come.
</p>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:40px;
">
Best regards,<br/>
<strong>The Inhaus Living Team</strong>
</p>

</td>
</tr>

<!-- CTA -->
<tr>
<td align="center" style="padding:0 70px 70px 70px;">

<a href="https://www.inhausliving.com.au/projects"
style="
display:inline-block;
padding:18px 42px;
font-size:13px;
letter-spacing:1.2px;
text-transform:uppercase;
text-decoration:none;
border-radius:40px;
border:2px solid #F67C0B;
color:#F67C0B;
background:transparent;
font-weight:600;
box-shadow:0 10px 20px rgba(246,124,11,0.15);
">
Explore Timeless Design Ideas
</a>

</td>
</tr>

<!-- SOCIAL -->
<tr>
<td align="center" style="
border-top:1px solid #eee;
padding:40px 20px 10px 20px;
font-size:14px;
">

<a href="https://www.linkedin.com/company/inhausliving" style="margin:0 12px;color:#555;text-decoration:none;">LinkedIn</a>
<a href="https://au.pinterest.com/inhausliving" style="margin:0 12px;color:#555;text-decoration:none;">Pinterest</a>
<a href="https://www.instagram.com/inhaus_living" style="margin:0 12px;color:#555;text-decoration:none;">Instagram</a>
<a href="https://www.facebook.com/inhausliving.com.au" style="margin:0 12px;color:#555;text-decoration:none;">Facebook</a>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="
padding:30px;
text-align:center;
font-size:12px;
color:#777;
">

<strong style="color:#111;">Inhaus Living</strong><br/>
Design-led renovations & interiors<br/><br/>

© ${new Date().getFullYear()} INHAUS LIVING. ALL RIGHTS RESERVED.

<br/><br/>

<p style="font-size:12px;color:#999;">
You are receiving this email because you subscribed to Inhaus Living.

<br/><br/>

<a href="${process.env.API_URL}/api/unsubscribe?email=${encodeURIComponent(email)}" 
style="color:#999;text-decoration:underline;">
Unsubscribe
</a>
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</div>
`;