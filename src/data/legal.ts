import type { LegalSection } from '@/types';


export interface LegalDocument {
  label: string;
  title: string;
  updated: string;
  summary: string;
  glance: { title: string; text: string; target: string }[];
  sections: LegalSection[];
  cta: { label: string; title: string; text: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
}

export const privacyPolicy: LegalDocument = {
  label: 'Your data',
  title: 'Privacy Policy',
  updated: '2025-11-01',
  summary: 'This policy explains what personal data Vundabarweb collects, why we collect it, how we protect it and the choices you have.',
  glance: [
    { title: 'What we collect', text: 'Contact details and project information you send us, plus basic site analytics.', target: 'data-we-collect' },
    { title: 'Why we collect it', text: 'To reply to you, run projects and improve our website.', target: 'how-we-use-it' },
    { title: 'Who we share it with', text: 'Only trusted tools that help us run the studio.', target: 'sharing-and-processors' },
    { title: 'Your rights', text: 'You can access, correct or delete your data at any time.', target: 'your-rights' },
  ],
  sections: [
    { id: 'who-we-are', title: 'Who we are', paragraphs: ['Vundabarweb is a boutique creative and development studio. In this policy, “we”, “us” and “our” refer to Vundabarweb.', 'You can reach us at hello@vundabarweb.com for any question about your data.'] },
    { id: 'data-we-collect', title: 'Data we collect', paragraphs: ['Information you give us: your name, email address, company and the details of your project when you write to us or fill in the project brief.', 'Information we collect automatically: pages visited, device type and approximate location through privacy-friendly analytics.'] },
    { id: 'how-we-use-it', title: 'How we use it', paragraphs: ['We use your information to reply to messages, prepare proposals, deliver projects, send occasional updates you asked for and improve our website.', 'We do not sell your personal data.'] },
    { id: 'cookies-and-analytics', title: 'Cookies and analytics', paragraphs: ['We use a small number of cookies and privacy-friendly analytics to understand how the site is used. You can disable cookies in your browser settings.'] },
    { id: 'sharing-and-processors', title: 'Sharing and processors', paragraphs: ['We share data only with service providers who help us operate, such as email, hosting and project tools. They may only use it to provide their service to us.'] },
    { id: 'retention', title: 'Retention', paragraphs: ['We keep project data for as long as needed to deliver and support the work, and contact enquiries for up to 24 months unless you ask us to delete them sooner.'] },
    { id: 'your-rights', title: 'Your rights', paragraphs: ['Depending on where you live, you may have the right to access, correct, delete or export your data, and to object to certain uses.', 'To exercise any of these rights, email hello@vundabarweb.com and we will respond within 30 days.'] },
    { id: 'security', title: 'Security', paragraphs: ['We use encryption in transit, access controls and reputable providers to protect your information. No system is perfectly secure, but we take reasonable steps to keep your data safe.'] },
    { id: 'international-transfers', title: 'International transfers', paragraphs: ['Because we work remotely, your data may be processed in countries outside your own. We use appropriate safeguards when we do.'] },
    { id: 'changes-to-this-policy', title: 'Changes to this policy', paragraphs: ['We may update this policy from time to time. The date at the top shows when it was last changed, and we will highlight significant changes on this page.'] },
  ],
  cta: {
    label: 'Questions',
    title: 'Questions about your data?',
    text: 'Write to hello@vundabarweb.com and a real person will answer. You can also read our Terms and Conditions.',
    primary: { label: 'Contact us', href: '/contact' },
    secondary: { label: 'Read the terms', href: '/terms-and-conditions' },
  },
};

export const termsAndConditions: LegalDocument = {
  label: 'The fine print',
  title: 'Terms and Conditions',
  updated: '2025-11-01',
  summary: 'These terms describe how we work together: scope, payment, ownership and what happens if plans change.',
  glance: [
    { title: 'Payments and invoices', text: 'A deposit starts the project and the rest is paid in milestones.', target: 'payment-terms' },
    { title: 'Revisions and approvals', text: 'Two focused revision rounds per stage, with clear sign-offs.', target: 'revisions-and-feedback' },
    { title: 'Ownership and licences', text: 'You own the final work once the project is paid in full.', target: 'intellectual-property-and-licences' },
    { title: 'Cancellations', text: 'Either side can end the project with written notice.', target: 'cancellation-and-termination' },
  ],
  sections: [
    { id: 'services-and-scope', title: 'Services and scope', paragraphs: ['We provide the services described in the proposal we both sign. Work outside that scope is agreed in writing before it begins.'] },
    { id: 'proposals-and-quotes', title: 'Proposals and quotes', paragraphs: ['Proposals are valid for 30 days. Prices are fixed for the scope described and exclude taxes unless stated otherwise.'] },
    { id: 'payment-terms', title: 'Payment terms', paragraphs: ['A 40% deposit is due before work starts. The remainder is invoiced at agreed milestones, payable within 14 days.', 'Late payments may pause the project until the invoice is settled.'] },
    { id: 'revisions-and-feedback', title: 'Revisions and feedback', paragraphs: ['Each stage includes two focused rounds of revisions. Additional rounds can be added for an agreed fee.'] },
    { id: 'client-responsibilities', title: 'Client responsibilities', paragraphs: ['You agree to provide content, feedback and approvals on time, and to give us accurate information. Delays on your side may move delivery dates.'] },
    { id: 'intellectual-property-and-licences', title: 'Intellectual property and licences', paragraphs: ['Once the project is paid in full, you own the final designs and code created for you. Third-party assets such as fonts and stock photography remain under their own licences.'] },
    { id: 'portfolio-and-credit', title: 'Portfolio and credit', paragraphs: ['We may show the finished work in our portfolio and credit ourselves on the project unless you ask us not to.'] },
    { id: 'confidentiality', title: 'Confidentiality', paragraphs: ['We keep your non-public business information confidential and expect the same of you for ours.'] },
    { id: 'warranties-and-liability', title: 'Warranties and liability', paragraphs: ['We work with care but cannot guarantee specific business results. Our liability is limited to the fees you paid for the relevant project.'] },
    { id: 'cancellation-and-termination', title: 'Cancellation and termination', paragraphs: ['Either party may end the project with written notice. You pay for the work completed up to that point, and we hand over what has been completed.'] },
    { id: 'governing-law', title: 'Governing law', paragraphs: ['These terms are governed by the laws of Portugal. Disputes will first be discussed in good faith before any formal process.'] },
    { id: 'changes-to-these-terms', title: 'Changes to these terms', paragraphs: ['We may update these terms occasionally. Signed proposals keep the terms that applied when they were signed.'] },
  ],
  cta: {
    label: 'Together',
    title: 'Ready to work together?',
    text: 'If these terms feel fair, tell us about your project. You can also read how we handle your data.',
    primary: { label: 'Start a project', href: '/contact' },
    secondary: { label: 'Privacy policy', href: '/privacy-policy' },
  },
};
