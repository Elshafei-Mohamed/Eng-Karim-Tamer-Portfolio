import { FileText, Mail, MessageCircle } from "lucide-react";
import { ContactGroup } from "@/types";
import { siteConfig } from "@/lib/site-config";


export const contactGroups: readonly ContactGroup[] = [
  {
    audience: "RECRUITER",
    channels: [
      {
        id: "resume",
        icon: FileText,
        label: "Resume",
        value: "PDF · DOWNLOAD",
        href: siteConfig.resumeUrl,
      },
      {
        id: "email-recruiter",
        icon: Mail,
        label: "Email",
        value: siteConfig.email,
        href: `mailto:${siteConfig.email}`,
      },
    ],
  },
  {
    audience: "CLIENT",
    channels: [
      {
        id: "email-client",
        icon: Mail,
        label: "Email",
        value: siteConfig.email,
        href: `mailto:${siteConfig.email}`,
      },
      {
        id: "whatsapp",
        icon: MessageCircle,
        label: "WhatsApp",
        value: siteConfig.phone,
        href: siteConfig.whatsappUrl,
      },
    ],
  },
] as const;
