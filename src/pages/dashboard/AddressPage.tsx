import { useEffect, useMemo, useState } from "react";
import toast from "@/components/ui/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/use-auth.store";
import { addAddress, deleteAddress, getAddresses, getProfile, setDefaultAddress, updateAddress } from "@/service/user/service";

type AddressForm = {
  fullName: string;
  phone: string;
  addressLine: string;
  ward?: string;
  district?: string;
  city?: string;
  province?: string;
};

export default function AddressPage() {
  const { user, setUser } = useAuthStore();
  const [profile, setProfile] = useState<any>(user ?? null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [needsUpdate, setNeedsUpdate] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<AddressForm>({
    fullName: "",
    phone: "",
    addressLine: "",
    ward: "",
    district: "",
    city: "",
    province: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirectTarget =
    redirectParam && redirectParam.startsWith("/") ? redirectParam : null;

  const displayPhone = useMemo(() => {
    return (
      profile?.phone ??
      profile?.phoneNumber ??
      profile?.mobile ??
      profile?.numberPhone ??
      ""
    );
  }, [profile]);

  useEffect(() => {
    let mounted = true;
    async function init() {
      setLoading(true);
      try {
        let p = profile;
        if (!p) {
          p = await getProfile();
          if (mounted) {
            setProfile(p);
            setUser?.(p);
          }
        }
        if (p?.id) {
          const list = await getAddresses();
          if (mounted) {
            const arr = Array.isArray(list) ? list : [];
            setAddresses(arr);
            const hasAddress = arr.length > 0;
            setNeedsUpdate(!hasAddress);
            // Nếu chưa có địa chỉ, hiển thị form luôn
            setShowForm(!hasAddress);
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      fullName:
        prev.fullName ||
        profile?.fullName ||
        profile?.name ||
        profile?.username ||
        "",
      phone: prev.phone || displayPhone || "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, displayPhone]);

  const handleChange = (key: keyof AddressForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const refreshAddresses = async () => {
    const list = await getAddresses();
    const arr = Array.isArray(list) ? list : [];
    setAddresses(arr);
    const hasAddress = arr.length > 0;
    setNeedsUpdate(!hasAddress);
    // Nếu chưa có địa chỉ, hiển thị form luôn
    if (!hasAddress) {
      setShowForm(true);
    }
  };

  const resetForm = () => {
    setForm({
      fullName: profile?.fullName || profile?.name || profile?.username || "",
      phone: displayPhone || "",
      addressLine: "",
      ward: "",
      district: "",
      city: "",
      province: "",
    });
    setEditingId(null);
  };

  const handleEdit = (addr: any) => {
    setForm({
      fullName: addr.recipientName || addr.fullName || profile?.fullName || profile?.name || "",
      phone: addr.phone || addr.phoneNumber || addr.mobile || displayPhone || "",
      addressLine: addr.detail || addr.addressLine || addr.fullAddress || "",
      ward: addr.ward || "",
      district: addr.district || "",
      city: addr.city || "",
      province: addr.province || "",
    });
    setEditingId(addr.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const required: Array<[keyof AddressForm, string]> = [
      ["fullName", "Vui lòng nhập họ và tên"],
      ["phone", "Vui lòng nhập số điện thoại"],
      ["addressLine", "Vui lòng nhập địa chỉ chi tiết"],
      ["ward", "Vui lòng nhập phường/xã"],
      ["district", "Vui lòng nhập quận/huyện"],
      ["province", "Vui lòng nhập tỉnh"],
    ];
    for (const [k, msg] of required) {
      const v = (form as any)[k];
      if (!v || String(v).trim() === "") {
        toast.error(msg);
        return;
      }
    }
    const phoneRegex = /^(0|\+84)\d{9}$/;
    if (!phoneRegex.test(form.phone.trim())) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }
    setSubmitting(true);
    const wasEditing = !!editingId;
    const hadAddressesBefore = addresses.length > 0;
    try {
      if (editingId) {
        const addr = addresses.find((a) => a.id === editingId);
        await updateAddress(editingId, {
          fullName: form.fullName,
          phone: form.phone,
          addressLine: form.addressLine,
          ward: form.ward,
          district: form.district,
          city: form.city,
          province: form.province,
          isDefault: addr?.isDefault ?? false,
        });
      } else {
        await addAddress({
          fullName: form.fullName,
          phone: form.phone,
          addressLine: form.addressLine,
          ward: form.ward,
          district: form.district,
          city: form.city,
          province: form.province,
          isDefault: addresses.length === 0, 
        });
        if (redirectTarget) {
          const redirectUrl = `${redirectTarget}${redirectTarget.includes("?") ? "&" : "?"}addressUpdated=1`;
          navigate(redirectUrl, { replace: true });
          return;
        }
      }
      await refreshAddresses();
      resetForm();
      if (wasEditing || hadAddressesBefore) {
        setShowForm(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteAddress(id);
    await refreshAddresses();
  };

  const hasAddresses = addresses.length > 0;

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-lime-100" />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-900">
          Quản lý địa chỉ
        </h1>
        {hasAddresses && !showForm && (
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
          >
            + Thêm địa chỉ
          </Button>
        )}
      </div>

      {needsUpdate && (
        <div className="mt-4 rounded-xl border border-yellow-200/80 bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
          Tài khoản của bạn chưa có địa chỉ giao hàng. Vui lòng bổ sung để thuận tiện khi đặt hàng.
        </div>
      )}

      {showForm && (
        <Card className="mt-6 overflow-hidden border-0 bg-white shadow-xl shadow-emerald-100/70">
        <CardContent className="space-y-4 p-0">
          <div className="border-b border-gray-100 px-6 py-5 bg-gradient-to-r from-emerald-50/60 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold uppercase tracking-wide text-emerald-700">
                  {editingId ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Điền thông tin nhận hàng chính xác để giao nhanh hơn.
                </p>
              </div>
              {hasAddresses && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 px-6 py-6 sm:grid-cols-2">
            <div>
              <div className="mb-1 text-sm text-gray-700">Họ và tên</div>
              <Input
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Người nhận"
              />
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-700">Số điện thoại</div>
              <Input
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Số điện thoại"
              />
            </div>
            <div className="sm:col-span-2">
              <div className="mb-1 text-sm text-gray-700">Địa chỉ</div>
              <Input
                value={form.addressLine}
                onChange={(e) => handleChange("addressLine", e.target.value)}
                placeholder="Số nhà, đường..."
              />
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-700">Phường/Xã</div>
              <Input
                value={form.ward || ""}
                onChange={(e) => handleChange("ward", e.target.value)}
                placeholder="Phường/Xã"
              />
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-700">Quận/Huyện</div>
              <Input
                value={form.district || ""}
                onChange={(e) => handleChange("district", e.target.value)}
                placeholder="Quận/Huyện"
              />
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-700">Thành phố</div>
              <Input
                value={form.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Thành phố"
              />
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-700">Tỉnh</div>
              <Input
                value={form.province || ""}
                onChange={(e) => handleChange("province", e.target.value)}
                placeholder="Tỉnh"
              />
            </div>
          </div>
          <div className="border-t border-gray-100 px-6 py-4 flex items-center gap-3">
            <Button
              onClick={handleSubmit}
              disabled={submitting || loading}
              className="rounded-full bg-emerald-600 px-5 font-semibold text-white shadow hover:bg-emerald-700"
            >
              {editingId ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
            </Button>
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                disabled={submitting || loading}
                className="rounded-full"
              >
                Hủy
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Danh sách địa chỉ</h2>
        {loading ? (
          <div className="text-sm text-gray-500">Đang tải...</div>
        ) : addresses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50/60 px-4 py-5 text-sm text-emerald-700">
            Chưa có địa chỉ nào.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {addresses.map((addr) => (
              <Card key={addr.id} className="overflow-hidden border-0 bg-white shadow-lg shadow-emerald-100/60">
                <CardContent className="flex items-start justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <div className="truncate text-[15px] font-semibold text-gray-900">
                      {addr.recipientName || addr.fullName || profile?.fullName || profile?.name || "Người nhận"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {addr.phone || addr.phoneNumber || addr.mobile || displayPhone || "—"}
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      {addr.detail || addr.addressLine || addr.fullAddress || "Không có địa chỉ chi tiết"}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {[addr.ward, addr.district, addr.city, addr.province].filter(Boolean).join(", ")}
                    </div>
                    {addr.isDefault ? (
                      <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                        Mặc định
                      </div>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {!addr.isDefault && (
                      <Button
                        variant="secondary"
                        className="rounded-full"
                        onClick={async () => { await setDefaultAddress(addr.id); await refreshAddresses(); }}
                      >
                        Đặt mặc định
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => handleEdit(addr)}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="destructive"
                      className="rounded-full"
                      onClick={() => handleDelete(addr.id)}
                    >
                      Xoá
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

