---
title: Get free GTS SSL with Caddy
description: This article tells you how to get free Google Trust Services SSL
  certificate for your website with Caddy
date: 2023-02-15T17:10:17.954Z
pinned: false
tags:
  - gts
  - googletrustservices
  - tls
  - ssl
  - certificate
draft: false
---
# How to get FREE Google Trust Services SSL certificate for your website with Caddy

Are you interested in learning how to obtain a free SSL certificate for your website from Google Trust Services using Caddy? Let me guide you through the process.

As you may be aware, Let's Encrypt's root certificate has expired, and some website owners have switched to a different certificate issuer or are dealing with Let's Encrypt's new root. For my personal websites, I use ZeroSSL and Amazon SSL, which work great for me, and Sectigo Root benefits from its accessible OSCP servers. However, I recently learned that Google is offering free public certificates for websites, which is pretty cool, and I decided to secure my website with GTS.

Here's how you can get a free SSL certificate from Google and install it with Caddy:

1. Create a project on Google Cloud Platform first (it's free, and you get a free $200 credit when you sign up).
2. Get your project ID: go to your GCP dashboard (<https://console.cloud.google.com/apis/dashboard?project=sharp-fire-310301>) and click the "My Project" button in the top left corner. Your project ID (e.g., sharp-fire-310310) should appear.
3. Go to https://console.cloud.google.com/apis/library/publicca.googleapis.com?project=<Project ID> to activate your Public Certificate Authority API. where Project ID is what you obtained in the previous step. Enable it for free.
4. Create an authority key: In the top right corner, click the Cloud Shell icon. Type in the following command:

   ```shell
   gcloud config set project <Project ID>
   gcloud beta publicca external-account-keys create
   ```

   W﻿here Project ID is the same as previous step. (When it prompts up for authorization, click accept)

   I﻿f the key created successfully, it should return something like

   ```shell
   Created an external account key
   [b64MacKey: 3f90fbuKnl9a0c8ItD-BZygttn-5yCxgak7NKVXHml5x3NM09cygJgbVZd1EDWxFif_OGzx2ZtDJCcH19_9QMA
   keyId: 5743b1609344f82973328515f883faa1]
   ```

   T﻿he  phrase after b64MacKey is your key, and after keyId is key id you need to use.
5. Update your Caddyfile: add following to your global option for Caddy

   ```editorconfig
   email <Your email>
   acme_ca https://dv.acme-v02.api.pki.goog/directory
   acme_eab {
           key_id <Your keyId>
           mac_key <Your b64MacKey>
   }
   ```

   I﻿f you haven't familiar with Caddy global options, see https://caddyserver.com/docs/caddyfile/options#global-options
6. R﻿eload Caddy: after run Caddy reload or systemctl restart caddy. Your GTS certificate  should now be ready. (This is faster than I expected since Lets and ZeroSSL issue SSL certificates slower than this).
7. To confirm that your certificate is ready, run systemctl status caddy, and you should see output indicating that your GTS SSL is active.

   ```
   Feb 15 11:15:24 misty caddy[2981403]: {"level":"info","ts":1676477724.6448865,"logger":"tls","msg":"served key authentication certificate","server_name":"<Your domain>","challenge":"tls-alpn-01","remote":"46.29.169.36:63136","distributed":false}
   Feb 15 11:15:28 misty caddy[2981403]: {"level":"info","ts":1676477728.6581016,"logger":"http.acme_client","msg":"authorization finalized","identifier":"<Your domain>","authz_status":"valid"}
   Feb 15 11:15:28 misty caddy[2981403]: {"level":"info","ts":1676477728.6589515,"logger":"http.acme_client","msg":"validations succeeded; finalizing order","order":"https://dv.acme-v02.api.pki.goog/order/oCVILp8kjElvQnZWnvFX0A"}
   Feb 15 11:15:34 misty caddy[2981403]: {"level":"info","ts":1676477734.5884278,"logger":"http.acme_client","msg":"successfully downloaded available certificate chains","count":1,"first_url":"https://dv.acme-v02.api.pki.goog/cert/4S6dCCidjIf3eN-C-pB-DhajSt0j7XoUQqTDq8fpltw"}
   Feb 15 11:15:34 misty caddy[2981403]: {"level":"info","ts":1676477734.589921,"logger":"tls.obtain","msg":"certificate obtained successfully","identifier":"<Your domain>"}
   Feb 15 11:15:34 misty caddy[2981403]: {"level":"info","ts":1676477734.5903862,"logger":"tls.obtain","msg":"releasing lock","identifier":"<Your domain>"}
   ```

   And that's it! Your website should now be secured with a free SSL certificate from Google Trust Services. Check it out and enjoy the added security. I've included an image of a website secured with GTS SSL for reference.

   ![Website with GTS SSL](https://ucarecdn.com/0045ec29-51b0-4ed9-827f-2419623e4f4a/)
