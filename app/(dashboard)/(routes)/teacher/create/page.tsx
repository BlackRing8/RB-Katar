"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Judul harus diisi",
    }),
});



const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push('teacher/courses/${response.data.id}');
            toast.success("Course created");
        } catch {
            toast.error("Sepertinya ada kesalahan")
        }
    }

    return ( 
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Nama Materi Yang ingin kamu buat
                </h1>
                <p>
                    Kamu bisa mengubahnya nanti.
                </p>
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nama Materi
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g 'Pemprograman berbasis Web'"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Materi tentang apa yang akan kamu berikan?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/teacher/courses">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button 
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default CreatePage;