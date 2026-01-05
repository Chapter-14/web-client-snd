import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Brain,
  Zap,
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import TopNav from "@/components/landing/topNav";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5f7fa] via-white to-[#e6e9ed] dark:from-[#0e293c] dark:via-[#1d5479] dark:to-[#0e293c] flex flex-col items-center">
      {/* Header */}
      <TopNav />
      {/* Hero Section */}
      <section className="container px-4 sm:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <Badge className="px-4 py-1 bg-[#ffa02f]/10 text-[#ffa02f] border-[#ffa02f]/20 hover:bg-[#ffa02f]/20">
            <Sparkles className="w-3 h-3 ml-1" />
            منصة تعليمية مدعومة بالذكاء الاصطناعي
          </Badge>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            تعلم بذكاء مع أدوات الدراسة{" "}
            <span className="bg-gradient-to-r from-[#1d5479] via-[#ffa02f] to-[#ff8c00] bg-clip-text text-transparent">
              المدعومة بالذكاء الاصطناعي
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-card max-w-2xl mx-auto">
            حوّل تجربة التعلم الخاصة بك مع مساعدة الذكاء الاصطناعي التفاعلية،
            والتعليقات الذكية، وجلسات الدراسة المخصصة. أتقن أي موضوع بشكل أسرع
            من أي وقت مضى.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SignedOut>
              <SignUpButton>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#1d5479] to-[#ffa02f] hover:from-[#0e293c] hover:to-[#ff8c00] text-white h-12 px-8 text-base"
                >
                  ابدأ التعلم مجاناً
                  <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href={`/my-library`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#1d5479] to-[#ffa02f] hover:from-[#0e293c] hover:to-[#ff8c00] text-white h-12 px-8 text-base"
                >
                  اذهب مكتبة الدورات
                  <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                </Button>
              </Link>
            </SignedIn>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              شاهد العرض التوضيحي
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-card-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>لا حاجة لبطاقة ائتمان</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>خطة مجانية للأبد</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>إلغاء في أي وقت</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container px-4 sm:px-8 py-20 border-y border-card-muted/20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge className="px-4 py-1 bg-[#ffa02f]/10 text-[#ffa02f] border-[#ffa02f]/20">
              المميزات
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold">
              كل ما تحتاجه{" "}
              <span className="bg-gradient-to-r from-[#1d5479] to-[#ffa02f] bg-clip-text text-transparent">
                للتفوق
              </span>
            </h2>
            <p className="text-lg text-card-muted max-w-2xl mx-auto">
              ميزات قوية مصممة لتحسين رحلتك التعليمية وتعزيز إنتاجيتك
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="relative overflow-hidden border-2 hover:border-[#ffa02f]/50 transition-all hover:shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffa02f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#1d5479] to-[#0e293c] flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle>محادثة بالذكاء الاصطناعي</CardTitle>
                <CardDescription>
                  احصل على إجابات وتوضيحات فورية من مدرسنا الذكي المتاح على مدار
                  الساعة
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-[#ffa02f]/50 transition-all hover:shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffa02f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#ffa02f] to-[#ff8c00] flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>تعليقات توضيحية ذكية</CardTitle>
                <CardDescription>
                  قم بتمييز المواد الدراسية والتعليق عليها وتنظيمها باستخدام
                  أدوات ذكية
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-[#ffa02f]/50 transition-all hover:shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffa02f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#1d5479] to-[#ffa02f] flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle>دراسة تفاعلية</CardTitle>
                <CardDescription>
                  تفاعل مع المحتوى التفاعلي وأسئلة التدريب المصممة خصيصاً
                  لمستواك
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-[#ffa02f]/50 transition-all hover:shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffa02f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#ffa02f] to-[#ff8c00] flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle>تتبع التقدم</CardTitle>
                <CardDescription>
                  راقب رحلتك التعليمية من خلال التحليلات والرؤى التفصيلية
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-[#ffa02f]/50 transition-all hover:shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffa02f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#1d5479] to-[#0e293c] flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle>تفاعل صوتي</CardTitle>
                <CardDescription>
                  ادرس دون استخدام اليدين باستخدام الأوامر الصوتية وميزات النسخ
                  الصوتي
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-[#ffa02f]/50 transition-all hover:shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffa02f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#ffa02f] to-[#ff8c00] flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle>مكتبة الدورات</CardTitle>
                <CardDescription>
                  الوصول إلى مكتبة متنامية من الدورات عبر مواضيع ومجالات متعددة
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 sm:px-8 py-20">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#1d5479] to-[#ffa02f]">
          <div className="absolute inset-0 bg-grid-white/10" />
          <CardContent className="relative p-12 sm:p-16 text-center space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold text-white">
              هل أنت مستعد لتحويل تجربة التعلم؟
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              انضم إلى آلاف الطلاب الذين يتعلمون بذكاء بالفعل باستخدام أدوات
              الذكاء الاصطناعي
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <SignedOut>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="bg-white text-[#1d5479] hover:bg-white/90 h-12 px-8 text-base font-bold"
                  >
                    ابدأ مجاناً
                    <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/admin/dashboard">
                  <Button
                    size="lg"
                    className="bg-white text-[#1d5479] hover:bg-white/90 h-12 px-8 text-base font-bold"
                  >
                    انتقل إلى لوحة التحكم
                    <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
