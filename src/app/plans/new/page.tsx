"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/services/session";
import { createPlan } from "@/services/plans";
import { useLanguage } from "@/i18n/LanguageContext";

export default function NewPlanPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [recomendations, setRecomendations] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session.id) {
      router.push("/auth/login");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const session = getSession();
    if (!session.id) {
      setError(t("newPlan.mustLogin"));
      router.push("/auth/login");
      return;
    }

    if (name.trim().length < 2 || name.trim().length > 50) {
      setError(t("newPlan.errorName"));
      return;
    }

    const price = Number(estimatedPrice);
    if (!estimatedPrice || Number.isNaN(price) || price <= 0) {
      setError(t("newPlan.errorPrice"));
      return;
    }

    const time = Number(estimatedTime);
    if (!estimatedTime || Number.isNaN(time) || !Number.isInteger(time) || time <= 0) {
      setError(t("newPlan.errorDuration"));
      return;
    }

    if (description.trim().length === 0 || description.length >= 600) {
      setError(t("newPlan.errorDescription"));
      return;
    }

    if (address.trim().length === 0) {
      setError(t("newPlan.errorAddress"));
      return;
    }

    if (image.trim().length === 0) {
      setError(t("newPlan.errorImage"));
      return;
    }

    try {
      await createPlan({
        name: name.trim(),
        description: description.trim(),
        estimatedPrice: price,
        estimatedTime: time,
        recomendations: recomendations.trim(),
        address: address.trim(),
        image: image.trim(),
        userId: session.id,
      });
      router.push("/plans");
    } catch (err) {
      setError(t("newPlan.errorGeneric"));
      console.log(err);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center bg-slate-50 py-16">
      <h1 className="text-5xl font-bold text-slate-900">{t("newPlan.title")}</h1>
      <p className="text-lg text-slate-600 mt-2">{t("newPlan.subtitle")}</p>

      <form
        onSubmit={handleSubmit}
        data-cy="new-plan-form"
        className="bg-white rounded-2xl shadow-lg p-8 mt-10 w-full max-w-lg"
      >
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
          {t("newPlan.name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={50}
          required
          data-cy="name-input"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none text-slate-900"
        />

        <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mt-4">
          {t("newPlan.description")}
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={599}
          required
          rows={4}
          data-cy="description-input"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none text-slate-900"
        />

        <label htmlFor="estimatedPrice" className="block text-sm font-semibold text-slate-700 mt-4">
          {t("newPlan.price")}
        </label>
        <input
          id="estimatedPrice"
          name="estimatedPrice"
          type="number"
          value={estimatedPrice}
          onChange={(e) => setEstimatedPrice(e.target.value)}
          required
          data-cy="price-input"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none text-slate-900"
        />

        <label htmlFor="estimatedTime" className="block text-sm font-semibold text-slate-700 mt-4">
          {t("newPlan.duration")}
        </label>
        <input
          id="estimatedTime"
          name="estimatedTime"
          type="number"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          required
          data-cy="duration-input"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none text-slate-900"
        />

        <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mt-4">
          {t("newPlan.address")}
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          data-cy="address-input"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none text-slate-900"
        />

        <label htmlFor="image" className="block text-sm font-semibold text-slate-700 mt-4">
          {t("newPlan.image")}
        </label>
        <input
          id="image"
          name="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          data-cy="image-input"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none text-slate-900"
        />

        <label htmlFor="recomendations" className="block text-sm font-semibold text-slate-700 mt-4">
          {t("newPlan.recommendations")}
        </label>
        <textarea
          id="recomendations"
          name="recomendations"
          value={recomendations}
          onChange={(e) => setRecomendations(e.target.value)}
          rows={2}
          data-cy="recommendations-input"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none text-slate-900"
        />

        {error && (
          <p data-cy="form-error" className="text-sm text-red-600 mt-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          data-cy="submit-button"
          className="w-full bg-blue-700 text-white font-semibold rounded-xl py-4 mt-8"
        >
          {t("newPlan.submit")}
        </button>
      </form>
    </div>
  );
}
