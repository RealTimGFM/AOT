import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AuthCard from "@/components/AuthCard";

export default function SignupPage() {
  return (
    <>
      <SiteHeader />

      <main className="auth-wrap">
        <AuthCard mode="signup" />
      </main>

      <SiteFooter />
    </>
  );
}
