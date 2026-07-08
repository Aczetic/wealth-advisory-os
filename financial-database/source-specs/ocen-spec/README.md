# Open Credit Enablement Network specification
APIs for interaction between lender and Loan Service Provider(LSP)

# Overview	

India is starved of access to formal, affordable credit. There is a massive market opportunity to be tapped here that has been inhibited because the current rails for flow of capital to the untapped market are broken. 

They are broken for the lenders, to be able to reach out to these prospective borrowers and surface creditworthy borrowers. Few of the many reasons include high cost of borrower acquisition and time consuming custom third party tie-ups with loan originators.

They are broken for the marketplaces to connect their customers with lenders. The custom integrations and manual processes are costly and time consuming. The Turnaround Time to get loans deposited to customers is high and their ability to provide custom financial products quickly is restricted, owing to implementation challenges.

Sourcing, identity verification, underwriting, disbursement, recollections and dispute management are few of the many responsibilities managed by a lender today. Historically, the best lenders have had to excel at each of these skills in order to maximise their profit pools and serve the larger and larger markets.

OCEN is an initiative to unbundle lending and enable the creation of specialized entities, each specialized at one part of the job. Therefore, we envision the future of lending to be a partnership between multiple firms individually focused on sourcing/distribution, identity verification, underwriting, capital arrangement, recollections, etc. The entities like marketplaces who have high business-connect with their customers (businesses or individuals), can embed credit offerings in their applications now. These entities are referred to as 'Loan Service Providers' (LSPs)

LSP is a departure from the Direct Sourcing Agent (DSA) model and is an 'agent of the borrower'. LSP explains to borrowers their 'bill of rights' ensuring  transparency and safeguarding of borrower interests. It educates them about the various credit product offerings, pricing and more details. It helps them get access to formal, affordable credit at low interest rates and collaborates with lenders to create more tailored offerings for borrowers.

A reference LSP is being created to showcase the power of the above idea. In its simplest form, it's a loan marketplace that enables SMEs to compare loan offers from multiple lenders and choose the best one. In its more advanced version, This LSP would be akin to a borrower’s financial advisor, looking after their interests, fetching the best offers and advising the customer to make good decisions.

In the longer run, it is envisioned that many more LSP-like applications (LSPs) will be created. Each of these would focus on distinct borrower pools and build the specialized experiences suited to their customers. This would allow lenders to focus purely on their underwriting and collections logic and cater to diverse collaborations with the LSPs.

This is a manifestation of our efforts to democratise credit.

# High Level Architecture

![High Level Architecture](/ER-Diagram/HighLevelArchitecture.PNG)

# Sequence Diagram

![Loan Application](/Sequence-Diagram/LoanApplication.PNG)

![Consent API](/Sequence-Diagram/ConsentAPIs.PNG)

![Offer API](/Sequence-Diagram/OfferAPIs.PNG)

![Loan Acceptance API](/Sequence-Diagram/LoanAcceptanceAPIs.PNG)

![Grant Loan API](/Sequence-Diagram/GrantLoan.PNG)

![Consent Monitoring](/Sequence-Diagram/ConsentMonitoring.PNG)

![Repayment API](/Sequence-Diagram/RepaymentAPIs.PNG)

![Confirm Repayment](/Sequence-Diagram/ConfirmRepayment.PNG)

![Disbursement API](/Sequence-Diagram/Disbirsement.PNG)

![Dispute Management](/Sequence-Diagram/DisputeManagement.PNG)

![Trigger Repayment](/Sequence-Diagram/TriggerRepayment.PNG)

# UI - API Mapping

1. CreateLoanApplicationRequest is called when ShareInvoices Button in the below screen is clicked

![Create Loan Application](/UI-Mapping/CreateLoanApplication.PNG) 

2. ConsentHandleRequest - For first time users, this API is called during the creating AA account loading screen

![Consent Handle](/UI-Mapping/ConsentHandleRequest.PNG)

3. ConsentStatusRequest - This API is called once the user approves the consent request on the LSP app by clicking on Allow Button.

![Consent Status](/UI-Mapping/ConsentStatus.PNG)

4. Generate Offers Request

This API is called immediately after the ConsentStatusResponse is received from the lender. This API is called during the load screen - Sharing Financial Information with Lenders

![Generate Offers](/UI-Mapping/GenerateOffers.PNG)

5.  AcceptOffer Request and TriggerOTPRequest - This API is invoked when the user clicks on I agree in the Loan Agreement page.

![Loan Aggreement](/UI-Mapping/LoanAggrement.PNG)

6. Verify OTP Request - This API gets invoked when the user manually enters the OTP/ OTP is autoread by Sahay and submitted.

![Verify OTP](/UI-Mapping/VerifyOTP.PNG)

7. SetRepaymentPlanRequest and setRepaymentPlanStatusResponse  - This API is invoked by the LSP once the user clicks on the setAutoRepayment option.

![SetUp Repayment](/UI-Mapping/SetUpRepaymentPlan.PNG)

8. ConsentHandleRequest (For Monitoring) - This API is invoked once the OTP submission is done.

9. ConsentStatusRequest (For Monitoring) - This API is invoked once the user has approved the monitoring consent on the UI by clicking on Allow button

![Consent Monitoring](/UI-Mapping/ConsentStatusReq.PNG)

10. GrantLoanRequest - This API gets called once the repayment is set and the loader screen - processing your loan appears

![Grant Loan](/UI-Mapping/GrantLoan.PNG)

11. TriggerDisbursementRequest - This API gets called once the grantLoanResponse is received from the lender. It happens on the same loader screen where grantLoan is called.

12. Disbursement Successful - After the loan is disbursed succesfully. The Success message is loaded in the screen.

![Final Screen](/UI-Mapping/FinalScreen.PNG)









