---
title: How to get FREE Google Trust Services SSL certificate for your website
  with Caddy
description: This article tells you how to get free Google Trust Services SSL
  certificate for your website with Caddy
date: 2023-02-15T17:10:17.954Z
pinned: true
tags:
  - gts
  - googletrustservices
  - tls
  - ssl
  - certificate
draft: true
---


It has been a while since Let's Encrypt's root certificate expired. Some website owners have switched to a different certificate issuer or are dealing with Let's Encrypt's new root.

I, personally, use mostly ZeroSSL and Amazon SSL for securing most personal websites, and Sectigo Root works great for me and also benefits from its accessible OSCP servers. I just recently read that Google is providing free public certificates for websites: https://cloud.google.com/blog/products/identity-security/automate-public-certificate-lifecycle-management-via-acme-client-api, and I think it would be cool to have my website secured by GTS (Google Trust Services).

Here is what we can do to get a free SSL certificate from Google (I would also include how to install it with Caddy).

1. Create a project on Google Cloud Platform first (it's free, and you get a free $200 credit when you sign up).
2.