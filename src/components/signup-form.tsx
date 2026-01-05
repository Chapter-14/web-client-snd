import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">إنشاء حسابك</CardTitle>
          <CardDescription>
            أدخل بريدك الإلكتروني أدناه لإنشاء حسابك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">الاسم الكامل</FieldLabel>
                <Input id="name" type="text" placeholder="أحمد محمد" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      تأكيد كلمة المرور
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  يجب أن تحتوي على 8 أحرف على الأقل.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">إنشاء حساب</Button>
                <FieldDescription className="text-center">
                  هل لديك حساب بالفعل؟{" "}
                  <Link href="/auth/login">تسجيل الدخول</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-card">
        بالنقر على متابعة، فإنك توافق على <a href="#">شروط الخدمة</a> و{" "}
        <a href="#">سياسة الخصوصية</a>.
      </FieldDescription>
    </div>
  );
}
