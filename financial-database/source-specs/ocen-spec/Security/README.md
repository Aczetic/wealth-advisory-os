# Security

# Overview of Security
This document describes the security aspects of LSP and the security processes to be followed between the Lender and the LSP while transmitting data over API calls. On a high level, these are the security aspects that need to be ensured.

 HTTPS - All API calls must be done securely over HTTPS

 Two-way TLS -  The system should use Two-way TLS to ensure that both parties can send the information securely

 Digital Signature - All communication between the LSP and Lender should be digitally signed as per the JSON Web Signature Specification

Onboarding Process  - One Time Onboarding process to be done between LSP and Lenders to configure the security parameters. More details on this in the relevant sections below
# What is two-way TLS/SSL
The credit system that we are building is an asynchronous system and we need to ensure that both systems follow Transport Layer Security (TLS) Protocol to communicate with each other. In Normal TLS, the client first checks the authenticity of the server. However, the server does not try to identify the client. Since, in our case, we need to verify the identities of both the systems involved, “Two Way SSL” needs to be used. "Two-Way SSL" is usually called TLS/SSL with client certificate authentication because both parties authenticate each other.
 
# Onboarding Process
To get the Lender onboarded with respect to security, few details need to be collected and shared. This is a one-time process and can be captured using the below form. Once the Lender completes the onboarding form and sends the data, the LSP will share the Public Key that should be used for communication with the Lender and also the key to verify the requests originating from LSP.


Data that will be captured are as following

 Lender URL - The Lender’s endpoint where the LSP APIs are hosted. This should be the base URL. For example, if the Lender has hosted APIs at the URL - http://bank.com/credit/v3/loanApplication/createLoanApplicationRequest, then the base URL will be http://bank.com/credit
 Lender SSL Certificate
 Lender Signature verification Key (Public Key)
You can configure 2 keys. You can dynamically switch between these keys with the kid in the payload.  If you want to block use of one of them then you have to explicitly inform.
The document should also have the email address and contact details of the SPOC.
Both parties will share IP addresses to the whitelist. Make sure you provide multiple addresses (max 3) so that datacenter flips can be handled smoothly.
# Request Response Signing - Digital Signature
 # How to generate a public key:
    This is a self generated certificate.
    openssl genrsa -out privatekey.txt 2048 
    openssl rsa -in privatekey.txt -pubout -out publickey.txt


 # Sample Public Key
        -----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvU9bDiztJfPPUMszbRYuvCrUmatXCEoXFge++SYhAJwql4cW2BYsgltztVSfVsGlQ1C3mj5S5b8td21KbtT8tzwnS+UPlAns0GqMjwmv1qyjirFWZ0naRj5qSMRDIEUGOg+klNnCKaCYwiBII7uk7B/VTVaZtMQKPnrfl+3YynpPqYdFEqv7wipRVFkO6b196PWNgzTMhYq1XDCFEd/YCmD+DHUkMoqu+V6gdc1mI+dbYclTMI02q0LoVaBZ+1mcqFLfHDqrfBr/O/h1iB3zGCAEHLixMOdQsO9lsS1DMui+rhnWf2uji2GxyF8ggBLH8lifKuxSs6l0vajMW/yaQIDAQAB
        -----END PUBLIC KEY-----

The JSON Web Signature (RFC7515) standard describes the process of creation and validation of a data structure representing a signed payload. Let’s take an example for the TriggerLoanAcceptanceRequest API. The JSON request object will look like the following:
        
    {
        "metadata": {
       "version": "1.0",
       "timestamp": "2018-12-06T11:39:57.153Z",
       "traceId": "e8cc6822bd4bbb4eb1b9e1b4996fbff8acb",
       "orgId": "LSP123"
        },
        "requestId": "e8cc6822bd4bbb4eb1b9e1b4996fbff8acb",
        "loanApplicationIds": [
       "e8cc6822bd4bbb4eb1b9e1b4996fbff8acb"
        ],
        "credBlock": {
       "type": "OTP",
       "data": {
           "appToken": "0aBCD7DMr7s"
        }
        }
    }
 
 
Before we can sign this, we need to stringify the payload, utf8 encode and then base64 encode this object to obtain the payload. The result of the base64url encoding of the above transaction is:
        
        eyJtZXRhZGF0YSI6eyJ2ZXJzaW9uIjoiMS4wIiwidGltZXN0YW1wIjoiMjAxOC0xMi0wNlQxMTozOTo1Ny4xNTNaIiwidHJhY2VJZCI6ImU4Y2M2ODIyYmQ0YmJiNGViMWI5ZTFiNDk5NmZiZmY4YWNiIiwib3JnSWQiOiJMU1AxMjMifSwicmVxdWVzdElkIjoiZThjYzY4MjJiZDRiYmI0ZWIxYjllMWI0OTk2ZmJmZjhhY2IiLCJsb2FuQXBwbGljYXRpb25JZHMiOlsiZThjYzY4MjJiZDRiYmI0ZWIxYjllMWI0OTk2ZmJmZjhhY2IiXSwiY3JlZEJsb2NrIjp7InR5cGUiOiJPVFAiLCJkYXRhIjp7ImFwcFRva2VuIjoiMGFCQ0Q3RE1yN3MifX19

Additional parameters are associated with each payload. One of those is the required “alg” parameter, which indicates what algorithm needs to be used to generate a signature. This is a mandatory field. Another parameter we will be using is “kid”. “Kid” is a hint indicating which key was used to sign the JWS. 


All the above-mentioned parameters are included in the final JWS. These have to be sent as protected headers. Assume we want to sign our payload using a key as we generated in the previous section. Our header JSON would look like this:
    
        {
        "kid": "cb59cce2-7581-414d-bff7-6ecf132dbef1",
        "alg": "RS512"
        }
 
and base64url encoded this would be:
    
        eyJraWQiOiJjYjU5Y2NlMi03NTgxLTQxNGQtYmZmNy02ZWNmMTMyZGJlZjEiLCJhbGciOiJSUzUxMiJ9

We will be using the RS512 algorithm for our use case. RS512 is an abbreviation for RSASSA-PKCS1-v1_5 using SHA-512. 

The base64url encoded payload and protected header are concatenated with a ‘.’ to form raw data, which is fed to the signature algorithm to produce the final signature. Finally, all of this output will be structured using the Flattened JWS JSON Serialization Syntax. 
    
What will a Lender and LSP get in every request/response/ack?

        curl <endpoint> -X POST -H 'Content-Type: application/json' -d \
        '{
        "payload" : "eyJtZXRhZGF0YSI6eyJ2ZXJzaW9uIjoiMS4wIiwidGltZXN0YW1wIjoiMjAxOC0xMi0wNlQxMTozOTo1Ny4xNTNaIiwidHJhY2VJZCI6ImU4Y2M2ODIyYmQ0YmJiNGViMWI5ZTFiNDk5NmZiZmY4YWNiIiwib3JnSWQiOiJMU1AxMjMifSwicmVxdWVzdElkIjoiZThjYzY4MjJiZDRiYmI0ZWIxYjllMWI0OTk2ZmJmZjhhY2IiLCJsb2FuQXBwbGljYXRpb25JZHMiOlsiZThjYzY4MjJiZDRiYmI0ZWIxYjllMWI0OTk2ZmJmZjhhY2IiXSwiY3JlZEJsb2NrIjp7InR5cGUiOiJPVFAiLCJkYXRhIjp7ImFwcFRva2VuIjoiMGFCQ0Q3RE1yN3MifX19",
        "header" : "eyJraWQiOiJjYjU5Y2NlMi03NTgxLTQxNGQtYmZmNy02ZWNmMTMyZGJlZjEiLCJhbGciOiJSUzUxMiJ9",
        "signature" : "c1NybGVra0BYJ1n5SAV5XckiQyen5rxmJKUhcvqjnDo3ZZaLN1kb3XQefu2iphorwcOLA4cPX_GVGdMbCOvwOOYnGomNeZ83gpdPUcnioa42Ywjk_-jKg8RqBWTKyIROAWjnACd2rufJxjwI7maO33T7btwUjsTRymAqNt6Bne36Nk_1ZAEKbeLXANzldZAsHGav3nA0E88TAQ_HWf1iQREHxS2Q2ASvfGvtSmORmwsPHAng_8NUEDKvfqwsc5R0lNbMwagsEkILp9gHQbuYHHXv1IcHOKlCNP0H6Z-PmBQc295mw_u8J7shx_7P7RefOib1ISrKkbdpD4aChzoZew"
        }'
 

 
# Sample Implementation
 Python :: https://github.com/google/jws
 Java :: https://github.com/auth0/java-jwt


# More Details
 # How are the keys managed?
   Every lender and LSP will share multiple keys with the counterparty to ensure that the keys are rotated without any downtime.In case of key compromise counterparty has to be informed explicitly and just changing the keys in the payload won’t be enough.

 # Encryption specification
     We will be using the RS512 algorithm for signing (Link). The key size will be 2048 bits. Exact specification:: We will be using the RS512 algorithm for our use case. RS512 is an abbreviation for RSASSA-PKCS1-v1_5 using SHA-512. 


 # What are the security issues we have taken care of?
     Two-way TLS/SSL will help to establish a  bi-directional secure transport channel between the  LSP and the Lender. JWS ensures that the message was not tampered with during transit. 2048 bit RSA for encryption along with SHA512 for hashing ensures the integrity of the message against attackers. 
     
     “timeStamp” and “traceId” fields in metaData will together act as a nonce value to avoid replay attacks. 

 # Things you should be careful about
     Take into account the Security consideration section of the RFC. Be careful about the libraries as some of them are vulnerable as mentioned in this doc (https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/)



# Reference

    Algorithms for digital Signatures - https://tools.ietf.org/html/rfc7518#section-3.1
    JWS RFC -  https://tools.ietf.org/html/rfc7515
    RSA RFC - https://tools.ietf.org/html/rfc3447
