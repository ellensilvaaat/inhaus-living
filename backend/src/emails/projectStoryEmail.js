export const projectStoryEmail = (firstName = "", email = "") => `
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
src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/projects/Paddington%202/0Q8A2646.jpg?updatedAt=1769569857242"
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
A Renovation Transformation Story
</h1>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:22px;
">
Every transformation tells a story.
</p>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:24px;
">
In this project, our clients wanted to transform a dated, disconnected house into a home that felt modern, functional and welcoming.
</p>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:24px;
">
Through close collaboration, thoughtful design and our end-to-end delivery approach, we reimagined the layout, refined the material palette and created spaces that flow naturally from one room to the next.
</p>

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
The result is a home that not only looks beautiful, but truly supports the way our clients live every day.
</p>

<p style="
font-size:16px;
line-height:1.9;
color:#555;
margin-bottom:30px;
">
See how design clarity transformed everything — from layout to finishes to flow.
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

<a href="https://www.inhausliving.com.au/projects/renovation-dillon-street-residence/"
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
View the Full Transformation
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